import { Link } from "react-router-dom";
import { useThemeStore } from "../utils/useThemeStore";

const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <div className="flex">
      {/* Sidebar (Not Fixed) */}
      <div className="w-64 min-h-screen bg-white dark:bg-gray-900 shadow-lg">
        <div className="p-5 border-b dark:border-gray-700">
          <a href="/">
            <img src="/image/Logo_UMT.png" alt="Umt" className="w-16 " />
          </a>
        </div>

        <ul className="py-3 space-y-3">
          <li>
            <Link
              to="/MsaForm_onepage"
              className="block px-5 py-2 text-blue-500 dark:text-blue-400 hover:underline"
            >
              Daftar Permohonan Program
            </Link>
          </li>
          <li>
            <Link
              to="/program-list"
              className="block px-5 py-2 text-blue-500 dark:text-blue-400 hover:underline"
            >
              Program List
            </Link>
          </li>
          <li>
            <Link
              to="/testMultiStepForm"
              className="block px-5 py-2 text-blue-500 dark:text-blue-400 hover:underline"
            >
              Test Multi-Step Form
            </Link>
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        <div className="p-5 flex justify-center">
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* Main Content */}
    </div>
  );
};

export default Sidebar;
