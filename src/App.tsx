import Container from "./shared/Container";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Container>
        <h1>Content will be here</h1>
      </Container>
      <Footer />
    </>
  );
};

export default App;
