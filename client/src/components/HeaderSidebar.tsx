import axios from "axios";
// import { useThemeStore } from "../utils/useThemeStore";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaFileAlt,
  FaThList,
  FaArchive,
  FaListUl,
  FaUserAlt,
} from "react-icons/fa";
import TabbedForm from "../pages/testMultiStepForm";

const HeaderSidebar = () => {
  // const { darkMode, toggleDarkMode } = useThemeStore();
  const { VITE_DATABASE_HOST } = import.meta.env;
  const handleLogout = async () => {
    try {
      await axios.delete(`${VITE_DATABASE_HOST}/user/logout`);
      window.location.href = "/Login"; // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // const toggleDarkMode = () => {
  //   const newTheme = darkMode ? "light" : "dark";
  //   document.documentElement.setAttribute("data-theme", newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   // ...existing code...
  // };

  return (
    <>
      <div className="navbar flex justify-between items-center bg-base-300 shadow-sm top-0">
        <div className="flex">
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle drawer-toggle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />{" "}
              </svg>
            </div>

            {/* Drawer */}
            <div className="drawer z-5000">
              <input
                id="my-drawer"
                type="checkbox"
                className="drawer-toggle "
              />
              <div className=" btn btn-ghost  btn-circle drawer-content ml-8 ">
                {/* Page content here */}
                <label htmlFor="my-drawer" className=" drawer-button">
                  <FaBars className="text-3xl text-center mt-4" />
                </label>
              </div>
              <div className="drawer-side top-24">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay "
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  <li>
                    <Link to="/MsaForm_onepage">
                      <div className="flex items-center">
                        <FaFileAlt className="text-2xl" />
                        <span className="ml-2">Daftar Permohonan Program</span>
                      </div>
                    </Link>
                  </li>
                  <div className="divider"></div>

                  <li>
                    <Link to="/program-list">
                      <div className="flex items-center ">
                        <FaThList className="text-2xl" />
                        <span className="ml-2">Senarai Program</span>
                      </div>
                    </Link>{" "}
                  </li>
                  <div className="divider"></div>
                  <li>
                    <Link to="/akreditasi-program/permohonan-akreditasi/">
                      <div className="flex items-center ">
                        <FaArchive className="text-2xl" />
                        <span className="ml-2">Permohonan Akreditasi</span>
                      </div>
                    </Link>{" "}
                  </li>
                  <div className="divider"></div>
                  <li>
                    <Link to="/akreditasi-program/senarai-permohonan-akreditasi/">
                      <div className="flex items-center ">
                        <FaListUl className="text-2xl" />
                        <span className="ml-2">
                          Senarai Permohonan Akreditasi
                        </span>
                      </div>
                    </Link>{" "}
                  </li>
                  <div className="divider"></div>
                  <li>
                    <Link to="/senarai-penilai-dalaman">
                      <div className="flex items-center ">
                        <FaUserAlt className="text-2xl" />
                        <span className="ml-2">Penilai dalaman program</span>
                      </div>
                    </Link>{" "}
                  </li>
                  <div className="divider"></div>
                </ul>
              </div>
            </div>
            {/* Drawer */}
          </div>
          <div className="  ">
            <Link to="/">
              <img src="/image/Logo_UMT.png" alt="UMT" className="w-18 ml-4" />
            </Link>
          </div>
        </div>
        <div className="p-5 flex justify-center items-center">
          {/* --- Custom Theme Toggle --- */}
          {/* <div className="flex justify-between items-center w-full">
            <label
              htmlFor="theme-toggle-checkbox"
              className="relative inline-block cursor-pointer select-none"
            >
              <input
                type="checkbox"
                id="theme-toggle-checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
                className="sr-only"
                aria-label="Tukar Tema"
              />
              <div
                className={`block w-17 h-10 rounded-full transition-colors duration-300 ease-in-out shadow-inner ${
                  darkMode ? "bg-gray-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`relative block w-8 h-8 rounded-full bg-white shadow top-1 left-1 transition-transform duration-300 ease-in-out transform ${
                    darkMode ? "translate-x-[28px]" : "translate-x-0"
                  }`}
                >
                  <svg
                    className={`absolute inset-0 w-4 h-4 m-auto text-yellow-500 transition-opacity duration-300 ease-in-out ${
                      darkMode ? "opacity-0" : "opacity-100"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                  </svg>

                  <svg
                    className={`absolute inset-0 w-4 h-4 m-auto  text-blue-400 transition-opacity duration-300 ease-in-out ${
                      darkMode ? "opacity-100" : "opacity-0"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </label>
          </div> */}
          <TabbedForm />
          {/* <button
            onClick={handleLogout}
            className="btn btn-outline ml-4"
            aria-label="Logout"
          >
            Logout
          </button> */}
          <div className="dropdown dropdown-end ml-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle ml-4"
            >
              <div className="w-10 rounded-full ">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderSidebar;
