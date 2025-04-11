// Product cart type
export interface ProductProps {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  description: string;
  category: "toys" | "accessory" | "stationery";
  sizes: string[];
  colors: string[];
}
