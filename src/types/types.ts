// Product cart type
export interface ProductProps {
  id?: number;
  _id: string;
  name: string;
  description: string;
  discount?: number;
  category: string;
  price: number;
  regularPrice: number;
  images: {
    _id: number; url: string 
}[];
}
