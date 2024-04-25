'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faSave, 
  faCancel 
} from '@fortawesome/free-solid-svg-icons';

const initialProducts: Product[] = [
  {
    id : 1,
    name : "TV",
    price : "1000",
    currency : "USD"
  },
  {
    id : 2,
    name : "SSD",
    price : "100",
    currency : "USD"
  }
];

const ProductsTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editProductId, setEditProductId] = useState<number | null>(null);


  const updateProduct = (id: number, name: string, price: string, currency: string): void => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, name, price, currency } : product
    );
    setProducts(updatedProducts);
    setEditProductId(null);
  };

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
          <button onClick={() => onSave(product.id, name, price, currency)} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2">
            <FontAwesomeIcon className=' size-5' icon={faSave} size="2xs" />
          </button>
          <button onClick={() => setEditProductId(null)} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
            <FontAwesomeIcon className=' size-5' icon={faCancel} size="2xs" />
          </button>
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
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => (
          editProductId === product.id ? (
            <EditableRow key={product.id} product={product} onSave={updateProduct} />
          ) : (
            <tr key={product.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.name}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.price}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.currency}</td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-between">
                    <button onClick={() => setEditProductId(product.id)}className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2">
                        <FontAwesomeIcon className=" size-5" icon={faEdit}/>
                    </button>
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                        <FontAwesomeIcon className=' size-5' icon={faTrash} size="2xs" />
                    </button>
                </td>
            </tr>
          )
        ))}
      </tbody>
    </table>
    </>
  );
};

export default ProductsTable;