'use client';

import Link from 'next/link';
import { titleFont } from '@/config/fonts';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';
import { useCartStore, useUIStore } from '@/store';
import { useEffect, useState } from 'react';

export const TopMenu = () => {
  const openMenu = useUIStore((state) => state.opeSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* Logo */}
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className='hidden sm:block'>
        <Link
          href='/gender/men'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Men
        </Link>
        <Link
          href='/gender/women'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Women
        </Link>
        <Link
          href='/gender/kid'
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
        >
          Kids
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className='flex items-center gap-2'>
        <Link href='/search'>
          <IoSearchOutline className='w-5 h-5' />
        </Link>
        <Link href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}>
          <div className='relative'>
            {loaded && totalItemsInCart > 0 ? (
              <span className='fade-in absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2'>
                {totalItemsInCart}
              </span>
            ) : null}
            <IoCartOutline className='w-5 h-5' />
          </div>
        </Link>

        <button
          className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
          onClick={openMenu}
        >
          Menu
        </button>
      </div>
    </nav>
  );
};
