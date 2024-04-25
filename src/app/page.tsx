'use client'
import ProductsTable from "./productsTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "@/components/ActionButton";
import { useBoundedState } from "@/store/boundedStore";
import ProductForm from "./productForm";

export default function Home() {
  const isCreating = useBoundedState((state: any) => state.isCreating)
  const setIsCreating = useBoundedState((state: any) => state.setIsCreating)

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-700">
        <p className="fixed left-0 top-0 flex w-full justify-center mb-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          CRUD Operations App
        </p>
        <ActionButton faIcon={faPlus}  onClick={setIsCreating}>
          <span>Add Product</span>
        </ActionButton>
        {isCreating && <ProductForm />}
        <ProductsTable />
    </main>
  );
}