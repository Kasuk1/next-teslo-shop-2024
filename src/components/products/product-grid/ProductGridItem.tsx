'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/interfaces';
import { ProductImage } from '@/components';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const { images, title, slug, price } = product;
  const [displayImage, setDisplayImage] = useState(images[0]);

  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link href={`/product/${slug}`}>
        <ProductImage
          src={displayImage}
          alt={title}
          className='w-[300px] h-[300px] object-cover rounded'
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(images[1])}
          onMouseLeave={() => setDisplayImage(images[0])}
        />
      </Link>

      <div className='p-4 flex flex-col'>
        <Link className='hover:text-blue-700' href={`/product/${slug}`}>
          {title}
        </Link>
        <span className='font-bold'>${price}</span>
      </div>
    </div>
  );
};
