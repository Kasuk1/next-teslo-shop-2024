export const revalidate = 60; // 60 seconds

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { ProductGender } from '@/interfaces';
import { Gender } from '@prisma/client';
import { redirect } from 'next/navigation';

interface Props {
  params: {
    gender: Gender;
  };
  searchParams: {
    page?: string;
  };
}

export default async function GenderByGenderPage({
  params: { gender },
  searchParams,
}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender,
  });
  const labels: Record<ProductGender, string> = {
    men: 'Men',
    women: 'Women',
    kid: 'Kids',
    unisex: 'All',
  };

  /*   if (!labels[gender]) {
    notFound();
  } */

  if (products.length === 0) {
    redirect(`/gender/${gender}`);
  }

  return (
    <>
      <Title title='Store' subtitle={`${labels[gender]} products`} />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
