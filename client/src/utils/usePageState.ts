import { create } from "zustand";



export interface PageState {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const usePageState = create<PageState>((set) => ({
  currentPage: 1.1, 
  setCurrentPage: (page) => set({ currentPage: page }),
}));
