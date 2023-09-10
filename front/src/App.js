import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import DetailProduit from "./components/home/detailProduit";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotFound from "./NotFound";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:produitId" element={<DetailProduit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
