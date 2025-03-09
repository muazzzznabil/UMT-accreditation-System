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
          document.documentElement.setAttribute("data-theme", newMode ? "dark" : "light");
          localStorage.setItem("theme", newMode ? "dark" : "light");
          return { darkMode: newMode };
        }),
    }),
    {
      name: "theme-storage", // Key for localStorage
    }
  )
);
