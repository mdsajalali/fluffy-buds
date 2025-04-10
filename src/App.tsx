import Accessories from "./components/Accessories";
import Hero from "./components/Hero";
import Toys from "./components/Toys";
import BottomNavbar from "./shared/BottomNavbar";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <>
      {/* Top Navbar */}
      <Navbar />
      {/* Bottom Navbar */}
      <BottomNavbar />
      {/* Hero */}
      <Hero />
      {/* Toys */}
      <Toys />
      {/* Accessories */}
      <Accessories />
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
