import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Beranda from "./pages/Beranda";
import Akademikpage from "./pages/Akademikpage";
import Fasilitaspage from "./pages/Fasilitaspage";
import Artikelpage from "./pages/Artikelpage";
import Programpage from "./pages/Programpage";
import Pendaftaranpage from "./pages/Pendaftaranpage";
import Kontakpage from "./pages/Kontakpage";

function App() {
  return (
    <>
      {/* navbar */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Beranda />} />
        <Route path="/akademik" element={<Akademikpage />} />
        <Route path="/artikel" element={<Artikelpage />} />
        <Route path="/fasilitas" element={<Fasilitaspage />} />
        <Route path="/program" element={<Programpage />} />
        <Route path="/pendaftaran" element={<Pendaftaranpage />} />
        <Route path="/kontak" element={<Kontakpage />} />
      </Routes>

      {/* footer */}
      <Footer />
    </>
  );
}

export default App;
