'use server';

import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
  try {
    const addressToDelete = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (!addressToDelete) return;

    await prisma.userAddress.delete({
      where: {
        userId,
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: 'We could not save the address',
    };
  }
};
