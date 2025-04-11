import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Accessories from "./components/Accessories";
import Hero from "./components/Hero";
import Stationery from "./components/Stationery";
import Toys from "./components/Toys";
import BottomNavbar from "./shared/BottomNavbar";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import { ProductProps } from "./types/types";
import Categories from "./components/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Shop from "./pages/Shop";

const App = () => {
  const location = useLocation();
  const [toys, setToys] = useState<ProductProps[]>([]);
  const [accessories, setAccessories] = useState<ProductProps[]>([]);
  const [stationery, setStationery] = useState<ProductProps[]>([]);
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setToys(data.filter((p: ProductProps) => p.category === "toys"));
        setAccessories(
          data.filter((p: ProductProps) => p.category === "accessory")
        );
        setStationery(
          data.filter((p: ProductProps) => p.category === "stationery")
        );
      });
  }, []);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!isAuthPage && <Navbar />}
      {!isAuthPage && <BottomNavbar />}

      <Routes>
        {/* Homepage */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Toys products={toys} />
              <Accessories products={accessories} />
              <Stationery products={stationery} />
              <Categories />
            </>
          }
        />

        {/* shop page */}
        <Route path="/shop" element={<Shop products={products} />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
