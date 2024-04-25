import { create } from "zustand"

export type BoundedState = {
    products: Product[]
    setProducts: (products: Product[]) => void
    isCreating: boolean
    setIsCreating: () => void
    permissions: string[]
}
  
export const useBoundedState = create((set) => ({
    products: [],
    setProducts: (products: Product[]) => set({ products }),
    isCreating: false,
    setIsCreating: () => set((state: any) => ({isCreating: !state.isCreating})),
    permissions: [],
    setPermissions: (permissions: string[]) => set({ permissions })
}))