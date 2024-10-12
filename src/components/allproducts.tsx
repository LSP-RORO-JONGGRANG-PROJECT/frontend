import React from 'react';
import NextImg from 'next/image';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  slug: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Debrifilator',
    price: 'IDR 438.000',
    imageUrl: '/images/products/debrifilator.jpg',
    slug: 'debrifilator',
  },
  {
    id: 2,
    name: 'PET Scan',
    price: 'IDR 538.000',
    imageUrl: '/images/products/petscan.webp',
    slug: 'pet-scan',
  },
  {
    id: 3,
    name: 'Surgery',
    price: 'IDR 408.000',
    imageUrl: '/images/products/surgery.webp',
    slug: 'surgery',
  },
  {
    id: 4,
    name: 'Ultrasonografi',
    price: 'IDR 438.000',
    imageUrl: '/images/products/usg.jpg',
    slug: 'ultrasonografi',
  },
  {
    id: 5,
    name: 'MRI Scan',
    price: 'IDR 600.000',
    imageUrl: '/images/products/usg.jpg',
    slug: 'mri-scan',
  },
  {
    id: 6,
    name: 'CT Scan',
    price: 'IDR 500.000',
    imageUrl: '/images/products/usg.jpg',
    slug: 'ct-scan',
  }
];

const ShopAll: React.FC = () => {
  return (
    <section className="text-gray-600 body-font py-0 mt-0">
      <div className="container px-5 py-10 mx-auto">
        <div className="text-center mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-2">
            All Products
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500">
            Explore our complete product catalog.
          </p>
        </div>

        <div className="flex flex-wrap -m-4 justify-center">
          {products.map((product) => (
            <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link href={`/productdetail/${product.slug}`}>
                <div className="block relative h-48 rounded overflow-hidden cursor-pointer">
                  <NextImg
                    alt={product.name}
                    className="object-cover object-center w-full h-full block"
                    src={product.imageUrl}
                    width={300}
                    height={300}
                  />
                </div>
              </Link>

              <div className="mt-2 text-center">
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {product.name}
                </h2>
                <p className="mt-1">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopAll;
