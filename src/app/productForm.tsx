'use client'
import { 
  faCancel, 
  faSave 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  Formik, 
  Form, 
  Field 
} from 'formik';
import React from 'react';
import { useBoundedState } from '../store/boundedStore';
import { BoundedState } from '@/types/StoreTypes';

const ProductForm: React.FC = () => {
  const setIsCreating = useBoundedState((state: BoundedState) => state.setIsCreating)
  const addProduct = useBoundedState((state: BoundedState) => state.addProduct)

  return (
    <div className=" bg-gray-50 flex flex-col justify-center mt-6">
      <div className=" w-full mx-auto">
        <div className=" bg-gray-200 p-4 border border-gray-300">
          <Formik
            initialValues={{ name: '', currency: 'BGN', price: '' }}
            onSubmit={async (values, actions) => {
              addProduct(values.name, values.currency, values.price);
              actions.setSubmitting(false);
              setIsCreating();
            }}
          >
            {formik => (
              <Form>
                <div className="px-5 bg-gray-200  text-sm flex justify-between gap-2">
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Product Name</label>
                    <Field id="name" name="name" type="text" placeholder="Enter product name"
                      className="text-black mt-1 block w-full px-3  py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                  </div>
                
                  <div className="mb-4">
                    <label htmlFor="currency" className="block text-sm font-semibold text-gray-700">Currency</label>
                    <Field as="select" id="currency" name="currency"
                      className="text-black mt-1 block w-full px-3  py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="BGN">BGN</option>
                    </Field>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price</label>
                    <Field id="price" name="price" type="number" placeholder="Enter price"
                      className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
                  </div>
                </div>
                <div className="px-5 bg-gray-200  text-sm flex justify-center">
                  <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2">
                    <FontAwesomeIcon className=" size-5 mr-1" icon={faSave}/>
                    <span>Save</span>
                  </button>
                  <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center" onClick={() => setIsCreating()}>
                     <FontAwesomeIcon className=' size-5 mr-1' icon={faCancel} />
                     <span>Cancel</span>
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;