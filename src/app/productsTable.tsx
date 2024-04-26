'use client'
import React, { useState } from 'react';
import { 
  faEdit, 
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import ActionButton from '@/components/ActionButton';
import ConfirmationModal from '@/components/ConfirmationModal';
import { useBoundedState } from '@/store/boundedStore';
import { BoundedState } from '@/types/StoreTypes';
import EditableRow from './editProductColumn';
import { PermissionsEnum } from '@/types/Permissions';

const ProductsTable: React.FC = () => {
  const products = useBoundedState((state: BoundedState) => state.products);
  const selectedProductId = useBoundedState((state: BoundedState) => state.selectedProductId);
  const setSelectedProductId = useBoundedState((state: BoundedState) => state.setSelectedProductId);
  const removeProduct = useBoundedState((state: any) => state.removeProduct);
  const permissions = useBoundedState((state: BoundedState) => state.permissions);
  const [modalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditBtnClicked, setIsEditBtnClicked]  = useState<boolean>(false);

  const handleConfirmAction = () => {
    removeProduct(selectedProductId); 
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
          {(permissions.includes(PermissionsEnum.DELETE) || permissions.includes(PermissionsEnum.UPDATE)) && 
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
          }
        </tr>
      </thead>
      <tbody>
        {products && products.length > 0 && (products.map((product: Product) => (
          selectedProductId === product?.id && isEditBtnClicked ? (
            <EditableRow key={product.id} product={product} />
          ) : (
            <tr key={product.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.name}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.price}</td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-black">{product.currency}</td>
              {(permissions.includes(PermissionsEnum.DELETE) || permissions.includes(PermissionsEnum.UPDATE)) && 
                (<td className={"px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-between"}>
                  {permissions.includes(PermissionsEnum.UPDATE) && (
                    <ActionButton faIcon={faEdit} onClick={() => {setSelectedProductId(product.id); setIsEditBtnClicked(true) }} />
                  )}
                  {permissions.includes(PermissionsEnum.DELETE) && ( 
                    <ActionButton faIcon={faTrash} onClick={() => {setSelectedProductId(product.id); setIsEditBtnClicked(false); setIsModalOpen(true)}}/>
                  )} 
                </td>
              )}
            </tr>
          )
        )))}
        {!products &&  (
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