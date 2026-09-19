import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import HindiWorksheet from './pages/HindiWorksheet';
import EnglishWorksheet from './pages/EnglishWorksheet';
import MathWorksheet from './pages/MathWorksheet';
import PrintWorksheet from './pages/PrintWorksheet';
import './App.css';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hindi" element={<HindiWorksheet />} />
        <Route path="/english" element={<EnglishWorksheet />} />
        <Route path="/math" element={<MathWorksheet />} />
        <Route path="/print/:subject" element={<PrintWorksheet />} />
      </Routes>
    </HashRouter>
  );
}
