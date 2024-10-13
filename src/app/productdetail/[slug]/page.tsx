'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound, useRouter } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  slug: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Debrifilator',
    price: 'IDR 438.000',
    imageUrl: '/images/products/debrifilator.jpg',
    slug: 'debrifilator',
    description: 'A device used to treat life-threatening cardiac dysrhythmias.',
  },
  {
    id: 2,
    name: 'PET Scan',
    price: 'IDR 538.000',
    imageUrl: '/images/products/petscan.webp',
    slug: 'pet-scan',
    description: 'A type of imaging test that uses a radioactive substance to look for disease in the body.',
  },
  {
    id: 3,
    name: 'Surgery',
    price: 'IDR 408.000',
    imageUrl: '/images/products/surgery.webp',
    slug: 'surgery',
    description: 'A medical procedure that involves the use of instruments to treat injuries, diseases, or deformities by removing, repairing, or replacing tissues or organs.'
  },
  {
    id: 4,
    name: 'Ultrasonografi',
    price: 'IDR 438.000',
    imageUrl: '/images/products/usg.jpg',
    slug: 'ultrasonografi',
    description: 'A diagnostic imaging technique that uses high-frequency sound waves to create images of organs and structures inside the body, commonly used during pregnancy and for examining the abdomen.'
  },  
];

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const product = products.find(p => p.slug === params.slug);

  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true');
  }, []);

  if (!product) {
    notFound();
  }

  const handleCheckout = () => {
    if (isLoggedIn) {
      router.push(`/checkout?product=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}`);
    } else {
      router.push(`/login?product=${encodeURIComponent(product.name)}&price=${encodeURIComponent(product.price)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 pr-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2 pl-4 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <button 
            onClick={handleCheckout}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}