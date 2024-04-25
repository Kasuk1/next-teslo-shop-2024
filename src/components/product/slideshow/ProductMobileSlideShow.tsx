'use client';

import Image from 'next/image';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideShow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: '100%',
          height: '500px',
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className='mySwiper2'
      >
        {images.map((imageSrc) => (
          <SwiperSlide key={imageSrc}>
            <Image
              width={1024}
              height={768}
              src={`/products/${imageSrc}`}
              alt={title}
              className='object-fill'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
