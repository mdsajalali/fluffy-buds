import Hero from "./components/Hero";
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
      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
