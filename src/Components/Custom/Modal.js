import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-25 z-50">
      <div className="bg-black rounded-lg p-6 shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6 text-yellow-400">{message}</p>
        <Link
          to="/products"
          onClick={onClose}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </Link>
      </div>
    </div>
  );
};

export default Modal;
