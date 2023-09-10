import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import DetailProduit from "./components/home/detailProduit";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./NotFound";
import { CartProvider } from "./contexte/CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:produitId" element={<DetailProduit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
