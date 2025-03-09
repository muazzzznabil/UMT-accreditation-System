import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import MsaForm from "./pages/MsaForm.tsx";
import NoPage from "./pages/NoPage.tsx";
import Header from "./components/Header.tsx";
import TabbedForm from "./pages/testMultiStepForm.tsx";
import ProgramList from "./pages/ProgramList.tsx";
import UpdateMaklumat from "./pages/updateMaklumat.tsx";
// import MsaForm_onePage from "./pages/MsaForm_onePage.tsx";
import ViewFullProgram from "./pages/ViewFullProgram.tsx";
import MSAForm_register from "./pages/MSAForm_register.tsx";

import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "./utils/useThemeStore.ts";

function App() {
  const themeStore = useThemeStore();
  return (
    <>
      <Router>
        <div
          className="font-sans flex space-x-8"
          data-theme={themeStore.darkMode ? "dark" : "light"}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/MsaForm" element={<MsaForm />} />
            <Route path="/MsaForm_onepage" element={<MSAForm_register />} />
            <Route path="/ProgramInfo/:id" element={<ViewFullProgram />} />
            <Route path="/program-list" element={<ProgramList />} />
            <Route path="/testMultiStepForm" element={<TabbedForm />} />
            <Route path="/edit-program/:id" element={<UpdateMaklumat />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
