import { create } from "zustand";
import type { AlumniFilter } from "@/api/schemas";

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  alumniFilter: AlumniFilter;
  setAlumniFilter: (filter: Partial<AlumniFilter>) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  alumniFilter: {},
  setAlumniFilter: (filter) =>
    set((s) => ({ alumniFilter: { ...s.alumniFilter, ...filter } })),
}));
