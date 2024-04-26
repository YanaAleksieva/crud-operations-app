import React from 'react';

const ConfirmationModal = ({ isOpen, setIsOpen, onConfirm }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Confirmation</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">Are you sure you want to perform this action?</p>
          </div>
          <div className="items-center px-4 py-3">
          <button
              onClick={() => setIsOpen(false)}
              className="ml-3 px-4 py-2 bg-gray-600 text-white text-base font-medium rounded-md w-auto shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm();
                setIsOpen(false);
              }}
              className="ml-3 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;