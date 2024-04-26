import { BoundedState } from "@/types/StoreTypes"
import { StoreApi, UseBoundStore, create } from "zustand"
  
export const useBoundedState: UseBoundStore<StoreApi<BoundedState>> = create((set, get) => ({
    products: [],
    setProducts: (products: Product[]) => set({ products }),
    isCreating: false,
    setIsCreating: () => set((state: any) => ({isCreating: !state.isCreating})),
    permissions: [],
    setPermissions: (permissions: string[]) => set({ permissions }),
    selectedProductId: null,
    setSelectedProductId: (selectedProductId: number | null) => set({ selectedProductId }),
    removeProduct: async (productId: number) => {
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
    updatedProducts: async (productId: string, name: string, currency: string, price: number) => {
        try {
          const response = await fetch('http://localhost:3000/api/products/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
          });
          if (!response.ok) throw new Error('Something went wrong!');
          const updatedProducts = get().products.map((product: any) => product.id === productId ? {...product, name, currency, price } : product);
          console.log(updatedProducts);
          set({ products: updatedProducts });
        } catch (error) {
          console.error("Failed to delete product:", error);
        }
      },
    addProduct: async (name: string, currency: string, price: number) => {
        try {
          const response = await fetch('http://localhost:3000/api/products/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, currency, price})
          });
          const result = await response.json();
          if (response.ok) {
            set(state => ({
              products: [...state.products, result.product]
            }));
            return result;
          } else {
            throw new Error(result.message || 'Failed to add product');
          }
        } catch (error) {
          console.error('Error adding product:', error);
          throw error;
        }
      }
}))

    // updateProduct: (id: string, name: string, currency: string, price: number) => set((state: any) => ({
    //     products: state.products.map((product: any) => product.id === id ? {...product, name, currency, price } : product)
    // }))