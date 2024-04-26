export type BoundedState = {
    products: Product[]
    setProducts: (products: Product[]) => void
    isCreating: boolean
    setIsCreating: () => void
    permissions: string[]
    setPermissions: (permissions: string[]) => void
    selectedProductId: number | null
    setSelectedProductId: (selectedProductId: number | null) => void
}