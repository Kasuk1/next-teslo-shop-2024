export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ProductSize[];
  slug: string;
  tags: string[];
  title: string;
  gender: ProductGender;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: ProductSize;
  image: string;
}

export interface ProductImage {
  id: number;
  url: string;
  productId: string;
}

export type ProductGender = 'men' | 'women' | 'kid' | 'unisex';
export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ProductCategory = 'shirts' | 'pants' | 'hoodies' | 'hats';
