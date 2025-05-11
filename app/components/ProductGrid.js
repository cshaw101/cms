"use client";

import useDummyProducts from '../api/data/mockData';

export default function ProductGrid() {
  const products = useDummyProducts();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map(product => (
        <div key={product.id} className="border p-2 rounded-lg shadow">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="font-semibold text-lg mt-2">{product.title}</h2>
          <p className="text-sm text-gray-600">{product.brand}</p>
          <p className="text-green-600 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}
