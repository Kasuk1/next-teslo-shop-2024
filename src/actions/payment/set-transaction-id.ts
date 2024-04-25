'use server';

import prisma from '@/lib/prisma';

export const setTransactionId = async (
  transactionId: string,
  orderId: string
) => {
  try {
    const order = await prisma.order.update({
      data: {
        transactionId,
      },
      where: { id: orderId },
    });

    if (!order) {
      return {
        ok: false,
        message: `We didn't find the order with ID: ${orderId}`,
      };
    }

    return {
      ok: true,
      message: `Order ID: ${orderId} was updated successfully!`,
    };
  } catch (error) {
    return {
      ok: false,
      message: `Error with request to update order: ${orderId}. Contact support.`,
    };
  }
};
