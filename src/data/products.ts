import type { Product } from '@/types/product';

const placeholderImage = (seed: string): string =>
  `https://picsum.photos/seed/${seed}/600/800`;

export const products: Product[] = [
  {
    id: '1',
    name: 'Linen Midi Dress',
    category: 'Dresses',
    price: 59.9,
    originalPrice: 79.9,
    imageUrl: placeholderImage('linen-dress'),
  },
  {
    id: '2',
    name: 'Oversized Denim Jacket',
    category: 'Jackets',
    price: 74.5,
    imageUrl: placeholderImage('denim-jacket'),
  },
  {
    id: '3',
    name: 'Silk Blend Blouse',
    category: 'Tops',
    price: 39.0,
    originalPrice: 52.0,
    imageUrl: placeholderImage('silk-blouse'),
  },
  {
    id: '4',
    name: 'High-Waist Wide Trousers',
    category: 'Pants',
    price: 48.0,
    imageUrl: placeholderImage('wide-trousers'),
  },
  {
    id: '5',
    name: 'Knit Cardigan',
    category: 'Knitwear',
    price: 54.9,
    imageUrl: placeholderImage('knit-cardigan'),
  },
  {
    id: '6',
    name: 'Pleated Satin Skirt',
    category: 'Skirts',
    price: 44.0,
    originalPrice: 58.0,
    imageUrl: placeholderImage('satin-skirt'),
  },
  {
    id: '7',
    name: 'Classic Trench Coat',
    category: 'Coats',
    price: 119.0,
    imageUrl: placeholderImage('trench-coat'),
  },
  {
    id: '8',
    name: 'Leather Crossbody Bag',
    category: 'Accessories',
    price: 64.0,
    originalPrice: 85.0,
    imageUrl: placeholderImage('crossbody-bag'),
  },
];
