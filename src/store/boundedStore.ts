import { create } from "zustand"

export type BoundedState = {
    products: Product[]
    setProducts: (products: Product[]) => void
    isCreating: boolean
    setIsCreating: () => void
}
  
export const useBoundedState = create((set) => ({
    products: [{
        id: '1',
        name: 'TV',
        currency: 'USD',
        price: 1000
    }],
    setProducts: (products: Product[]) => set((state: any) => ({
        products: [
            ...state.products
        ]
    })),
    isCreating: false,
    setIsCreating: () => set((state: any) => ({isCreating: !state.isCreating})),
}))