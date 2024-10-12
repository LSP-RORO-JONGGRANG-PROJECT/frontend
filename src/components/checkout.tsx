'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

const products = [
  {
    id: 1,
    name: 'Debrifilator',
    price: 438000,
    imageUrl: '/images/products/debrifilator.jpg',
    description: 'A device used to treat life-threatening cardiac dysrhythmias.',
  },
  {
    id: 2,
    name: 'PET Scan',
    price: 538000,
    imageUrl: '/images/products/petscan.webp',
    description: 'A type of imaging test that uses a radioactive substance to look for disease in the body.',
  },
];

export default function Checkout() {
  const searchParams = useSearchParams();
  const productName = searchParams.get('product');

  const product = products.find((p) => p.name === productName);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
  });

  const [quantity, setQuantity] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product && product.price) {
      const orderData = {
        items: [
          {
            id: product.id,
            quantity: quantity
          }
        ],
        buyerName: formData.name,
        email: formData.email,
        address: formData.address,
        cardNumber: formData.cardNumber
      };

      try {
        const response = await fetch('http://localhost:8000/api/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });

        const result = await response.json();
        if (response.ok) {
          alert(`Payment processed successfully! Total: IDR ${result.total}`);
        } else {
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Error processing payment:', error);
      }
    } else {
      alert('Product not found or price is missing.');
    }
};



  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="flex flex-wrap">

        <div className="w-full md:w-1/2">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
            <p>Product: {productName}</p>
            <p>Price per item: IDR {product?.price?.toLocaleString() ?? '0'}</p>
            <p>Total: IDR {(product?.price ? product.price * quantity : 0).toLocaleString()}</p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-lg">

          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-full px-3 py-2 border rounded"
            />
          </div>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block mb-2">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block mb-2">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors">
              Pay Now
            </button>
          </form>
        </div>

        {product && (
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
