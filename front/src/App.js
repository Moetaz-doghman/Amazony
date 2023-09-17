import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import DetailProduit from "./components/home/detailProduit";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./NotFound";
import { CartProvider } from "./contexte/CartContext";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Suggestions from "./components/home/Suggestions"

function App() {
  return (
    <Router>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:produitId" element={<DetailProduit />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sug" element={<Suggestions />} />
          <Route path="/xxxx" element={<NotFound />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
