'use server';

import prisma from '@/lib/prisma';

export const getStuckBySlug = async (slug: string): Promise<number> => {
  try {
    //await sleep(3);

    const stock = await prisma.product.findFirst({
      select: {
        inStock: true,
      },
      where: {
        slug,
      },
    });

    return stock ? stock.inStock : 0;
  } catch (error) {
    console.log(error);
    throw new Error('Error when try to get prduct by slug');
  }
};
