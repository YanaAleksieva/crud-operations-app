export type BoundedState = {
    products: Product[]
    setProducts: (products: Product[]) => void
    isCreating: boolean
    setIsCreating: () => void
    permissions: string[]
    setPermissions: (permissions: string[]) => void
    selectedProductId: string | null
    setSelectedProductId: (selectedProductId: string | null) => void
    removeProduct: (productId: string) => Promise<void>
    addProduct:  (name: string, currency: string, price: string) => Promise<void>
    updatedProducts: (productId: string, name: string, currency: string, price: string) => Promise<void>
}