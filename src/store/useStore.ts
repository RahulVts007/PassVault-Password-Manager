import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Password, PasswordCategory } from '../types/password';

interface State {
  isAuthenticated: boolean;
  masterPin: string | null;
  passwords: Password[];
  theme: 'light' | 'dark';
  searchQuery: string;
  selectedCategory: PasswordCategory | 'All';
  setAuthenticated: (value: boolean) => void;
  setMasterPin: (pin: string) => void;
  addPassword: (password: Omit<Password, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePassword: (id: string, password: Partial<Password>) => void;
  removePassword: (id: string) => void;
  toggleFavorite: (id: string) => void;
  toggleTheme: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: PasswordCategory | 'All') => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      masterPin: null,
      passwords: [],
      theme: 'light',
      searchQuery: '',
      selectedCategory: 'All',
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setMasterPin: (pin) => set({ masterPin: pin }),
      addPassword: (password) =>
        set((state) => ({
          passwords: [
            ...state.passwords,
            {
              ...password,
              id: crypto.randomUUID(),
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        })),
      updatePassword: (id, updates) =>
        set((state) => ({
          passwords: state.passwords.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
          ),
        })),
      removePassword: (id) =>
        set((state) => ({
          passwords: state.passwords.filter((p) => p.id !== id),
        })),
      toggleFavorite: (id) =>
        set((state) => ({
          passwords: state.passwords.map((p) =>
            p.id === id ? { ...p, favorite: !p.favorite } : p
          ),
        })),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'light' ? 'dark' : 'light',
        })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    {
      name: 'passvault-storage',
    }
  )
);