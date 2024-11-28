import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MsaForm from "./pages/MsaForm";
import NoPage from "./pages/NoPage";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/MsaForm" element={<MsaForm />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
