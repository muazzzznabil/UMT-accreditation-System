import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ThemeState {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      darkMode: localStorage.getItem("theme") === "dark", // Initialize from localStorage
    
      toggleDarkMode: () =>
        set((state) => {
          const newMode = !state.darkMode;
          // ! swap dark and light place when using different toggle button
          document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
          // document.documentElement.setAttribute("data-theme", newMode ? "light" : "dark");
          localStorage.setItem("theme", newMode ? "dark" : "light");
          // localStorage.setItem("theme", newMode ? "light" : "dark");
          return { darkMode: newMode };
        }),
    }),
    {
      name: "theme-storage", // Key for localStorage
    }
  )
);
