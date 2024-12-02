import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./views/Home.jsx"; 
import CopaAmerica from "./views/CopaAmerica.jsx";
import Galeria from "./views/Galeria.jsx";
import DetallePartido from "./components/partidos/detallePartido.jsx";
import ScrollToTop from "./components/scrollToTop.jsx";

const navArrayLinks = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Copa America",
    path: "/copa_america",
  },
  {
    title: "Galeria",
    path: "/galeria",
  }
];

function App() {
  return (
    <Router>
      <Navbar navArrayLinks={navArrayLinks} />
      <ScrollToTop />
      <Container sx={{ mt: 5 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/copa_america" element={<CopaAmerica />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/partido/:id" element={<DetallePartido />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;