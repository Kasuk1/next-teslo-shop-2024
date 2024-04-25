'use client';

import { getStuckBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useEffect, useState } from 'react';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getStock = async () => {
      const updatedStock = await getStuckBySlug(slug);
      setStock(updatedStock);
      setIsLoading(false);
    };

    if (!stock) getStock();
  }, [slug, stock]);

  if (isLoading)
    return (
      <h1
        className={`${titleFont.className} antialiased font-medium text-lg animate-pulse bg-gray-400`}
      >
        &nbsp;
      </h1>
    );

  return (
    <h1 className={`${titleFont.className} antialiased font-medium text-lg`}>
      Stock: {stock}
    </h1>
  );
};
