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
import Dashboard from "./pages/(dashboard)/Dashboard";
import AddItems from "./pages/(dashboard)/AddItems";
import ListItems from "./pages/(dashboard)/ListItems";
import Orders from "./pages/(dashboard)/Orders";

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
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/add-items" ||
    location.pathname === "/dashboard/list-items" ||
    location.pathname === "/dashboard/orders";

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

        {/* categories page */}
        <Route path="/categories" element={<Categories />} />

        {/* dashboard page */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-items" element={<AddItems />} />
          <Route path="list-items" element={<ListItems />} />
          <Route path="orders" element={<Orders />} />
        </Route>

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
