'use client'
import ProductsTable from "./productsTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "@/components/ActionButton";
import { useBoundedState } from "@/store/boundedStore";
import ProductForm from "./productForm";
import { useEffect } from "react";

export default function Home() {
  const isCreating = useBoundedState((state: any) => state.isCreating);
  const setIsCreating = useBoundedState((state: any) => state.setIsCreating);
  const permissions = useBoundedState((state: any) => state.permissions);
  const setPermissions = useBoundedState((state: any) => state.setPermissions);

  useEffect(() => {
    fetch('/api/permissions')
      .then(response => response.json())
      .then(data => setPermissions(data.data.permissions))
      .catch(error => console.error('There was an error fetching the permissions:', error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-700">
        <p className="fixed left-0 top-0 flex w-full justify-center mb-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          CRUD Operations App
        </p>
         {permissions.includes('CREATE') && ( 
          <ActionButton faIcon={faPlus}  onClick={setIsCreating}>
            <span>Add Product</span>
          </ActionButton>
        )} 
        {isCreating && <ProductForm />}
        {permissions.includes('READ') ? ( 
          <ProductsTable />
         ) : (
          <div className="p-24">
            Permissions needed in order to read data.
          </div>
         )} 
    </main>
  );
}