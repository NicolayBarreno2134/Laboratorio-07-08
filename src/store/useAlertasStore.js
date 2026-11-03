import { create } from 'zustand';

export const useAlertasStore = create((set) => ({
  alertaOperativa: null,
  setAlerta: (mensaje) => set({ alertaOperativa: mensaje }),
  limpiarAlerta: () => set({ alertaOperativa: null }),
}));