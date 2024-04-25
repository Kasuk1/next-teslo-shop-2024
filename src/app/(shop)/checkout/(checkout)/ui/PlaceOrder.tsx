'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useRouter } from 'next/navigation';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    /* Everything went well */
    clearCart();
    router.replace('/orders/' + resp.order?.id);

    setIsPlacingOrder(false);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Loading...</p>;

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl mb-2'>Order address</h2>
      <div className='mb-5'>
        <p className='text-xl'>
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className='w-full h-0.5 rounded bg-gray-200 mb-5' />

      <h2 className='text-2xl mb-2'>Order summary</h2>
      <div className='grid grid-cols-2'>
        <span>No. Products</span>
        <span className='text-right'>
          {itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}{' '}
        </span>

        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>

        <span>Tax (15%)</span>
        <span className='text-right'>{currencyFormat(tax)}</span>

        <span className='mt-5 text-2xl'>Total</span>
        <span className='mt-5 text-2xl text-right'>
          {currencyFormat(total)}
        </span>
      </div>

      <div className='mt-5 mb-2 w-full'>
        <p className='mb-5'>
          <span className='text-xs'>
            Click in Proceed order means that you agree with our{' '}
            <a href='#' className='underline'>
              Terms and conditions
            </a>{' '}
            and{' '}
            <a href='#' className='underline'>
              Privacy policy
            </a>
            .
          </span>
        </p>

        <p className='text-red-500'>{errorMessage}</p>

        <button
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
        >
          Proceed order
        </button>
      </div>
    </div>
  );
};
