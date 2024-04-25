'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {
  const { productsInCart } = useCartStore((state) => ({
    updateProductQuantity: state.udateProductQuantity,
    removeProductFromCart: state.removeProduct,
    productsInCart: state.cart,
  }));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className='flex flex-col gap-5'>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className='flex'>
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt={product.title}
            className='mr-5 rounded'
          />
          <div>
            <span>
              {product.title} - {product.size} ({product.quantity})
            </span>
            <p className='font-bold'>
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
