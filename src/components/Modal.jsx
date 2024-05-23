import React from 'react';

const Modal = ({ promotion, onClose, onAction }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-2xl font-bold mb-4">Promotion Details</h2>
        <h3 className="text-xl font-semibold mb-2">Created By:</h3>
        <p><span className="font-medium">Name:</span> {promotion?.createdBy?.name}</p>
        <p><span className="font-medium">Email:</span> {promotion?.createdBy?.email}</p>
        <p><span className="font-medium">Username:</span> {promotion?.createdBy?.username}</p>
        <p><span className="font-medium">Role:</span> {promotion?.createdBy?.role}</p>
        <p><span className="font-medium">Team:</span> {promotion?.createdBy?.team}</p>

        <h3 className="text-xl font-semibold mb-2 mt-4">Criteria:</h3>
        <p><span className="font-medium">Age Category:</span> {promotion?.criteria?.ageCategory}</p>
        <p><span className="font-medium">Marital Status:</span> {promotion?.criteria?.maritalStatus}</p>
        <p><span className="font-medium">Gender:</span> {promotion?.criteria?.gender}</p>
        <p><span className="font-medium">Product Type:</span> {promotion?.criteria?.productType}</p>

        <div className="flex space-x-2 mt-4">
          <button 
            className="bg-black text-white px-4 py-2 rounded" 
            onClick={onClose}
          >
            Close
          </button>
          <button 
            className="bg-black text-white px-4 py-2 rounded" 
            onClick={onAction}
          >
            {promotion?.action === 'accept' ? 'Accept' : 'Decline'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
