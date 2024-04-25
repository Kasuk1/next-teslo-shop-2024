import { create } from 'zustand';

interface State {
  isSideMenuOpen: boolean;
  opeSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<State>()((set) => ({
  isSideMenuOpen: false,
  opeSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}));
