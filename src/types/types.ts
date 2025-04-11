// Product cart type
export interface ProductProps {
  id: number;
  title: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: "toys" | "accessory" | "stationery";
}
