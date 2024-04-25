'use client';

import { ProductImage, QuantitySelector } from '@/components';
import { useCartStore } from '@/store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {
  const { productsInCart, updateProductQuantity, removeProductFromCart } =
    useCartStore((state) => ({
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
          <ProductImage
            src={product.image}
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
            <Link
              className='hover:underline cursor-pointer'
              href={`/product/${product.slug}`}
            >
              {product.title} - {product.size}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(val) => updateProductQuantity(product, val)}
            />

            <button
              className='underline mt-3'
              onClick={() => removeProductFromCart(product)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
