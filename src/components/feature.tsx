import React from 'react';
import NextImg from 'next/image';
import Link from 'next/link';

const products = [
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
];

const Feature = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {/* Title Section */}
        <div className="flex justify-between items-center mb-20">
  <div className="text-left">
    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
      Timeless Choice
    </h1>
    <h2 className="text-base leading-relaxed text-gray-500">
      Carefully crafted selections for your daily needs.
    </h2>
  </div>
  <div className="text-right">
    <Link href="/products">
      <span className="inline-flex items-center text-gray-900 underline hover:no-underline decoration-gray-500 hover:decoration-gray-900">
        SHOP ALL
      </span>
    </Link>
  </div>
</div>


        {/* Product Section */}
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

              <div className="mt-4 text-center">
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

export default Feature;
