import { useEffect, useState } from "react";
import Accessories from "./components/Accessories";
import Hero from "./components/Hero";
import Stationery from "./components/Stationery";
import Toys from "./components/Toys";
import BottomNavbar from "./shared/BottomNavbar";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import { ProductProps } from "./types/types";

const App = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
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
      <Toys products={products} />
      {/* Accessories */}
      <Accessories products={products} />
      {/* Stationery */}
      <Stationery products={products} />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
