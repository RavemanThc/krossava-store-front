import { create } from "zustand";
import { persist } from "zustand/middleware";

interface HistoryStore {
  history: string[];

  addToHistory: (id: string) => void;

  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      history: [],

      addToHistory: (id) => {
        const filtered = get().history.filter((item) => item !== id);

        filtered.unshift(id);

        set({
          history: filtered.slice(0, 20),
        });
      },

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "history-storage",
    },
  ),
);
