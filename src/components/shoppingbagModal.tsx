
// ShoppingBagModal.tsx
"use client";
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
}

interface ShoppingBagModalProps {
  cart: Product[];
  onClose: () => void;
  onRemoveItem: (id: number) => void;
}

const ShoppingBagModal: React.FC<ShoppingBagModalProps> = ({ cart, onClose, onRemoveItem }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-end">
      <div className="bg-white w-1/3 h-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Shopping Bag</h2>
          <button
            className="text-xl font-bold"
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col space-y-4">
          {cart.length === 0 ? (
            <p>Your shopping bag is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span>{item.price}</span>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <button className="mt-auto bg-black text-white py-2 px-4">
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingBagModal;