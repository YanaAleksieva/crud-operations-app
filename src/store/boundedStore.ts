import { BoundedState } from "@/types/StoreTypes";
import { 
  StoreApi, 
  UseBoundStore, 
  create } 
from "zustand";
import { v4 as uuid } from "uuid";
  
export const useBoundedState: UseBoundStore<StoreApi<BoundedState>> = create((set, get) => ({
    products: [],
    setProducts: (products: Product[]) => set({ products }),
    isCreating: false,
    setIsCreating: () => set((state: any) => ({isCreating: !state.isCreating})),
    permissions: [],
    setPermissions: (permissions: string[]) => set({ permissions }),
    selectedProductId: null,
    setSelectedProductId: (selectedProductId: string | null) => set({ selectedProductId }),
    removeProduct: async (productId: string) => {
      try {
        const response = await fetch('http://localhost:3000/api/products/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId }),
        });
        if (!response.ok) throw new Error('Something went wrong!');
        const updatedProducts = get().products.filter(p => p.id !== productId);
        set({ products: updatedProducts });
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    },
  updatedProducts: async (productId: string, name: string, currency: string, price: string) => {
      try {
        const response = await fetch('http://localhost:3000/api/products/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productId, name, currency, price }),
        });
        if (!response.ok) throw new Error('Something went wrong!');
        const updatedProducts = get().products.map((product: any) => product.id === productId ? {...product, name, currency, price } : product);
        set({ products: updatedProducts });
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    },
    addProduct: async (name: string, currency: string, price: string) => {
      const id = uuid();
      try {
        const response = await fetch('http://localhost:3000/api/products/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, name, currency, price })
        });
        if (!response.ok) throw new Error('Something went wrong!');
        const newProduct = await response.json();
        set(state => ({
          products: [...state.products, newProduct.product]
        }));
      } catch (error) {
        console.error('Error adding product:', error);
        throw error;
      }
    }
}))