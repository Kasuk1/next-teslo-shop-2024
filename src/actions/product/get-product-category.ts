'use server';

import prisma from '@/lib/prisma';

export const getProductCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'desc',
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};
