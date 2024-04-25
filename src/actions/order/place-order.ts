'use server';

import { auth } from '@/auth.config';
import { Address, ProductSize } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: ProductSize;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verify user session
  if (!userId) {
    return {
      ok: false,
      message: 'There is not user session',
    };
  }

  // Get products information
  // Note: remember that we can pick +2 items with the same ID
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // Calculate items in order
  const itemsInOrder = productIds.reduce((acc, curr) => acc + curr.quantity, 0);

  // Calculate total summary
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product)
        throw new Error(
          `Product with ID: ${item.productId} does not exist - 500`
        );

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Create database transaction
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Update products stock
      const updatedProductsPromises = products.map(async (product) => {
        // Accumulate values
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(
            `Product with id: ${product.id}, does not have enough quantity.`
          );
        }

        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      // Verify negative values in stock
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(
            `The product: ${product.title} does not have enough stock.`
          );
        }
      });

      // 2. Create order - Header - Details
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          // Reference to the items I want to insert
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // 3. Create order address
      // Address
      const { country, ...restAddress } = address;
      console.log({ address, restAddress });
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });

      return {
        order: order,
        orderAddress: orderAddress,
        updatedProducts: updatedProducts,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};
