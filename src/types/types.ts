// Product cart type
export interface ProductProps {
  id?: number;
  _id: string;
  name: string;
  description: string;
  discount?: number;
  category: string;
  sizes: string[];
  colors: string[];
  price: number;
  regularPrice: number;
  images: { url: string }[];
}
