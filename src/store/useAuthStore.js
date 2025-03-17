import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const useAuthStore = create()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useAuthStore
