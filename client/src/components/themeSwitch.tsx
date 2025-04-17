import { useThemeStore } from "../utils/useThemeStore";

const ThemeSwitch = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();
  return (
    <>
      {" "}
      {/* --- Custom Theme Toggle --- */}
      <div className="flex justify-between items-center w-full">
        {/* The clickable label area */}
        <label
          htmlFor="theme-toggle-checkbox"
          className="relative inline-block cursor-pointer select-none"
        >
          {/* Hidden checkbox to manage state */}
          <input
            type="checkbox"
            id="theme-toggle-checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="sr-only" // Visually hide the checkbox but keep it accessible
            aria-label="Tukar Tema"
          />
          {/* Track */}
          <div
            className={`block w-17 h-10 rounded-full transition-colors duration-300 ease-in-out shadow-inner ${
              darkMode ? "bg-gray-600" : "bg-gray-300"
            }`}
          >
            {/* Circle / Thumb */}
            <div
              className={`relative block w-8 h-8 rounded-full bg-white shadow top-1 left-1 transition-transform duration-300 ease-in-out transform ${
                darkMode ? "translate-x-[28px]" : "translate-x-0"
              }`}
            >
              {/* Icons inside the circle */}
              {/* Sun Icon */}
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
              {/* Moon Icon */}
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
      </div>
    </>
  );
};

export default ThemeSwitch;
