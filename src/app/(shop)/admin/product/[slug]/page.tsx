import { getProductBySlug, getProductCategories } from '@/actions';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { ProductForm } from './ui/ProductForm';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params: { slug } }: Props) {
  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getProductCategories(),
  ]);

  if (!product && slug !== 'new') {
    redirect('/admin/products');
  }

  const title = slug === 'new' ? 'New product' : 'Edit product';

  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  );
}
