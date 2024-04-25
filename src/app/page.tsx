import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductsTable from "./productsTable";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-700">
        <p className="fixed left-0 top-0 flex w-full justify-center mb-6 border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          CRUD Operations App
        </p>

        <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center space-x-2 mb-2">
          <FontAwesomeIcon className=" size-5" icon={faPlus}/>
          <span>Add Product</span>
        </button>
        <ProductsTable />
    </main>
  );
}