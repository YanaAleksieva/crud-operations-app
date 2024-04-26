import ActionButton from "@/components/ActionButton";
import { useBoundedState } from "@/store/boundedStore";
import { BoundedState } from "@/types/StoreTypes";
import { faCancel, faSave } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const EditableRow: React.FC<EditableRowProps> = ({ product }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [currency, setCurrency] = useState(product.currency);
    const setSelectedProductId = useBoundedState((state: BoundedState) => state.setSelectedProductId);
    const updatedProducts = useBoundedState((state: any) => state.updatedProducts);

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
          <ActionButton 
            faIcon={faSave}
            onClick={() => {
              updatedProducts(product.id, name, currency, price);
              setSelectedProductId(null)}} 
            />
          <ActionButton faIcon={faCancel} onClick={() => setSelectedProductId(null)} />
        </td>
      </tr>
    )

  };

  export default EditableRow;
