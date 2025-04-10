import { useEffect, useState } from "react";
import Accessories from "./components/Accessories";
import Hero from "./components/Hero";
import Stationery from "./components/Stationery";
import Toys from "./components/Toys";
import BottomNavbar from "./shared/BottomNavbar";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import { ProductProps } from "./types/types";
import Categories from "./components/Categories";

const App = () => {
  const [toys, setToys] = useState<ProductProps[]>([]);
  const [accessories, setAccessories] = useState<ProductProps[]>([]);
  const [stationery, setStationery] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter products by category
        setToys(
          data.filter((product: ProductProps) => product.category === "toys")
        );
        setAccessories(
          data.filter(
            (product: ProductProps) => product.category === "accessory"
          )
        );
        setStationery(
          data.filter(
            (product: ProductProps) => product.category === "stationery"
          )
        );
      });
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <Navbar />
      {/* Bottom Navbar */}
      <BottomNavbar />
      {/* Hero */}
      <Hero />
      {/* Toys */}
      <Toys products={toys} />
      {/* Accessories */}
      <Accessories products={accessories} />
      {/* Stationery */}
      <Stationery products={stationery} />

      {/* Categories */}
      <Categories />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
