import { Route, Routes, useLocation } from "react-router-dom";
import Accessories from "./components/Accessories";
import Hero from "./components/Hero";
import Stationery from "./components/Stationery";
import Toys from "./components/Toys";
import BottomNavbar from "./shared/BottomNavbar";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import Categories from "./components/Categories";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/(dashboard)/Dashboard";
import AddItems from "./pages/(dashboard)/AddItems";
import ListItems from "./pages/(dashboard)/ListItems";
import Orders from "./pages/(dashboard)/Orders";
import RefundPolicy from "./pages/(privacy-policy)/Refund-Policy";
import TermsConditions from "./pages/(privacy-policy)/Terms-Conditions";
import PrivacyPolicy from "./pages/(privacy-policy)/Privacy-Policy";
import Shop from "./pages/(products)/Shop";
import ProductDetails from "./pages/(products)/ProductDetails";
import Cart from "./pages/(cart)/Cart";
import MyOrders from "./pages/(orders)/MyOrders";
import ProductUpdate from "./pages/(dashboard)/ProductUpdate";
import useCategoriesProduct from "./hooks/useCategoriesProduct";
import Verify from "./pages/(cart)/Verify";

const App = () => {
  const location = useLocation();
  const { toys, accessories, stationery, products } = useCategoriesProduct();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/dashboard" ||
    location.pathname === "/dashboard/add-items" ||
    location.pathname === "/dashboard/list-items" ||
    location.pathname.startsWith("/dashboard/list-items/") ||
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
        <Route path="/shop/:id" element={<ProductDetails />} />

        {/* categories page */}
        <Route path="/categories" element={<Categories />} />

        {/* cart page */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/verify" element={<Verify />} />

        {/* order page */}
        <Route path="/my-orders" element={<MyOrders />} />

        {/* privacy policy pages */}
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* dashboard page */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="add-items" element={<AddItems />} />
          <Route path="list-items" element={<ListItems />} />
          <Route path="list-items/:id" element={<ProductUpdate />} />
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
