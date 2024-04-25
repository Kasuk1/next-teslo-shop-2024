'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user)
    return {
      ok: false,
      message: 'You should authenticate first.',
    };

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order || !order.OrderAddress || !order.OrderItem) {
      throw new Error(`${id} does not exist.`);
    }

    if (session.user.role === 'user') {
      if (session.user.id !== order.userId) {
        throw new Error(`Order #${id} is not from current user.`);
      }
    }

    return {
      ok: true,
      order,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error,
    };
  }
};
