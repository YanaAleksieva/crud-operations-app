'use client'
import ProductsTable from "./productsTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ActionButton from "@/components/ActionButton";
import { useBoundedState } from "@/store/boundedStore";
import ProductForm from "./productForm";
import { useEffect } from "react";
import { BoundedState } from "@/types/StoreTypes";
import { PermissionsEnum } from "@/types/Permissions";
import Permissions from "./permissions";

const Home = () => {
  const isCreating = useBoundedState((state: BoundedState) => state.isCreating);
  const setIsCreating = useBoundedState((state: BoundedState) => state.setIsCreating);
  const permissions = useBoundedState((state: BoundedState) => state.permissions);
  const setPermissions = useBoundedState((state: BoundedState) => state.setPermissions);
  const setProducts = useBoundedState((state: BoundedState) => state.setProducts)

  useEffect(() => {
    fetch('/api/permissions')
      .then(response => response.json())
      .then(data => setPermissions(data.data.permissions))
      .catch(error => console.error('There was an error fetching the permissions:', error));

    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('There was an error fetching the permissions:', error));
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center p-24 bg-gray-700">
        <Permissions />
        <p className="fixed left-0 top-0 flex w-full justify-center mb-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          CRUD Operations App
        </p>
          {permissions.includes(PermissionsEnum.CREATE) && ( 
            <ActionButton faIcon={faPlus}  onClick={setIsCreating}>
              <span>Add Product</span>
            </ActionButton>
          )}
        {isCreating && <ProductForm />}
        {permissions.includes(PermissionsEnum.READ) ? ( 
          <ProductsTable />
         ) : (
          <div className="p-24">
            Permissions needed in order to read data.
          </div>
         )}
    </main>
  );
}

export default Home;