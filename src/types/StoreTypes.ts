export type BoundedState = {
    products: Product[]
    setProducts: (products: Product[]) => void
    isCreating: boolean
    setIsCreating: () => void
    permissions: string[]
    setPermissions: (permissions: string[]) => void
    selectedProductId: number | string | null
    setSelectedProductId: (selectedProductId: number | string | null) => void
}