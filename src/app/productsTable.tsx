'use client'
import React, { useState } from 'react';
import { 
  faEdit, 
  faTrash, 
  faSave, 
  faCancel 
} from '@fortawesome/free-solid-svg-icons';
import ActionButton from '@/components/ActionButton';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useBoundedState } from '@/store/boundedStore';

const ProductsTable: React.FC = () => {
  const products = useBoundedState((state: any) => state.products);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [modalOpen, setIsModalOpen] = useState<boolean>(false);

  const permissions = useBoundedState((state: any) => state.permissions);

  const handleConfirmAction = () => {
    console.log('Action confirmed!');
    // ADD DELETE HERE
  };

  // const updateProduct = (id: number, name: string, price: string, currency: string): void => {
  //   const updatedProducts = products.map(product =>
  //     product.id === id ? { ...product, name, price, currency } : product
  //   );
  //   setProducts(updatedProducts);
  //   setEditProductId(null);
  // };

  const EditableRow: React.FC<EditableRowProps> = ({ product, onSave }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [currency, setCurrency] = useState(product.currency);

    return (
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="p-2 border rounded text-black" />
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black"> 
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="p-2 border rounded" />
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">
          {/* <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="p-2 border rounded" /> */}
          <select id="currency" name="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="BGN">BGN</option>
          </select>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">
        <ActionButton faIcon={faSave} onClick={() => onSave(product.id, name, price, currency)} />
        <ActionButton faIcon={faCancel} onClick={() => setEditProductId(null)} />
        </td>
      </tr>
    );
  };

  return (
    <>
    <table className="table-auto mt-6 ">
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Price
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Currency
          </th>
          {(permissions.includes('DELETE') || permissions.includes('UPDATE')) && 
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
          }
        </tr>
      </thead>
      <tbody>
        {products && products.length > 0 ? (products.map((product: Product) => (
          editProductId === product.id ? (
            <EditableRow key={product.id} product={product} onSave={() => console.log('UPDATE')} />
          ) : (
            <tr key={product.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.name}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.price}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.currency}</td>
              {(permissions.includes('DELETE') || permissions.includes('UPDATE')) && 
                (<td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-between"}>
                  {permissions.includes('UPDATE') && (
                    <ActionButton faIcon={faEdit} onClick={() => setEditProductId(product.id)} />
                  )}
                  {permissions.includes('DELETE') && ( 
                    <ActionButton faIcon={faTrash} onClick={() => setIsModalOpen(true)} />
                  )} 
                </td>
              )}
            </tr>
          )
        ))) : (
          <tr key={Math.random()}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">No data available</td>
          </tr>
        )}
      </tbody>
    </table>
    <ConfirmationModal
      isOpen={modalOpen}
      setIsOpen={setIsModalOpen}
      onConfirm={handleConfirmAction}
    />
    </>
  );
};

export default ProductsTable;