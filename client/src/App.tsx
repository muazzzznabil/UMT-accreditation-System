import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import NoPage from "./pages/NoPage.tsx";
import Login from "./pages/UserManagement/login.tsx";
import Register from "./pages/UserManagement/Register.tsx";
import AuthenticationWrapper from "./layouts/AuthenticationWrapper";
import TabbedForm from "./pages/testMultiStepForm.tsx";
import ProgramList from "./pages/ProgramList.tsx";
import UpdateMaklumat from "./pages/updateMaklumat.tsx";
import ViewFullProgram from "./pages/ViewFullProgram.tsx";
import MSAForm_register from "./pages/MSAForm_register.tsx";
import "react-toastify/dist/ReactToastify.css";
import { useThemeStore } from "./utils/useThemeStore.ts";
import Evaluator_List from "./pages/InternalEvaluator_List.tsx";
import RegisterEvaluator from "./pages/RegisterEvaluator_register.tsx";
import InternalEvaluator_update from "./pages/InternalEvaluator_update.tsx";
import InternalEvaluator_view from "./pages/InternalEvaluator_view.tsx";
import HeaderSidebar from "./components/HeaderSidebar.tsx";
import Accreditation_list from "./pages/accreditationRecords_list.tsx";
import Accreditation_register from "./pages/accreditationRecords_register.tsx";
import Application_register from "./pages/application_register.tsx";
import Application_view from "./pages/application_view.tsx";
import Application_update from "./pages/application_update.tsx";
import Maklumbalas_register from "./pages/maklumbalas_register.tsx";
import Maklumbalas_view from "./pages/maklumbalas_view.tsx";
import Payment_view from "./pages/payment_view.tsx";
import Payment_register from "./pages/payment_register.tsx";
import Payment_update from "./pages/payment_update.tsx";
import ChatBot from "./components/ChatBot.tsx";
import AccreditationRecords_update from "./pages/accreditationRecords_update.tsx";
import AccreditationRecords_view from "./pages/accreditationRecords_view.tsx";

function AppContent() {
  const themeStore = useThemeStore();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className="font-sans flex-col space-x-8 h-screen"
      data-theme={themeStore.darkMode ? "dark" : "light"}
    >
      {currentPath !== "/Login" &&
        currentPath !== "/login" &&
        currentPath !== "/Registration" && (
          <>
            <HeaderSidebar /> <ChatBot />
          </>
        )}

      <div className="z-0">
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Register />} />
          <Route
            path="/"
            element={
              // <AuthenticationWrapper>
              <Homepage />
              // </AuthenticationWrapper>
            }
          />
          {/* Evaluator */}
          <Route
            path="/penilai-dalaman/:id/:name"
            element={
              <AuthenticationWrapper>
                <Evaluator_List />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/daftar-penilai/:id/:name"
            element={
              <AuthenticationWrapper>
                <RegisterEvaluator />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/daftar-penilai/:id_program/:id/:name/update"
            element={
              <AuthenticationWrapper>
                <InternalEvaluator_update />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/daftar-penilai/:id_program/:id/:name/evaluator-detail"
            element={
              <AuthenticationWrapper>
                <InternalEvaluator_view />
              </AuthenticationWrapper>
            }
          />
          {/* Evaluator */}
          {/* Accreditation */}
          <Route
            path="/akreditasi-program/:id/:nama_program"
            element={
              <AuthenticationWrapper>
                <Accreditation_list />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/akreditasi-program/:id/permohonan-akreditasi/:nama_program"
            element={
              <AuthenticationWrapper>
                <Accreditation_register />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/akreditasi-program/:id/kemaskini-akreditasi/:nama_program"
            element={
              <AuthenticationWrapper>
                <AccreditationRecords_update />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/akreditasi-program/:id/:nama_program/butiran-penuh-akreditasi"
            element={
              <AuthenticationWrapper>
                <AccreditationRecords_view />
              </AuthenticationWrapper>
            }
          />
          {/* Accreditation */}
          {/* Accreditation Application */}
          <Route
            path="/akreditasi-program/permohonan-akreditasi/"
            element={
              <AuthenticationWrapper>
                <Application_register />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/akreditasi-program/senarai-permohonan-akreditasi/"
            element={
              <AuthenticationWrapper>
                <Application_view />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/akreditasi-program/:id/:nama_program/update-permohonan-akreditasi"
            element={
              <AuthenticationWrapper>
                <Application_update />
              </AuthenticationWrapper>
            }
          />
          {/* Accreditation Application */}
          {/* maklumbalas Akreditasi */}
          <Route
            path="/maklumbalas-akreditasi/:id/:program_id"
            element={
              <AuthenticationWrapper>
                <Maklumbalas_register />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/maklumbalas-akreditasi/:id/:program_id/maklumat-maklumbalas"
            element={
              <AuthenticationWrapper>
                <Maklumbalas_view />
              </AuthenticationWrapper>
            }
          />
          {/* maklumbalas Akreditasi */}
          {/* Msa Form */}
          <Route
            path="/MsaForm_onepage"
            element={
              <AuthenticationWrapper>
                <MSAForm_register />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/ProgramInfo/:id"
            element={
              <AuthenticationWrapper>
                <ViewFullProgram />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/program-list"
            element={
              <AuthenticationWrapper>
                <ProgramList />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/testMultiStepForm"
            element={
              <AuthenticationWrapper>
                <TabbedForm />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/edit-program/:id"
            element={
              <AuthenticationWrapper>
                <UpdateMaklumat />
              </AuthenticationWrapper>
            }
          />
          {/* Msa Form */}
          {/* payment */}
          <Route
            path="/rekod-pembayaran/:program_id/:name"
            element={
              <AuthenticationWrapper>
                <Payment_view />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/rekod-pembayaran/tambah-rekod-pembayaran/:program_id/:name"
            element={
              <AuthenticationWrapper>
                <Payment_register />
              </AuthenticationWrapper>
            }
          />
          <Route
            path="/rekod-pembayaran/butiran-rekod-pembayaran/:program_id/:payment_id/:name"
            element={
              <AuthenticationWrapper>
                <Payment_update />
              </AuthenticationWrapper>
            }
          />
          {/* payment */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
