import BottomNavbar from "./shared/BottomNavbar";
import Container from "./shared/Container";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <>
      {/* Top Navbar */}
      <Navbar />
      {/* Bottom Navbar */}
      <BottomNavbar />
      <Container>
        <h1 className="md:mt-20 my-2">Content will be here</h1>
      </Container>
      <Footer />
    </>
  );
};

export default App;
