"use client"

import ProductTable from '../components/ProductTable'

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <ProductTable />
    </div>
  )
}
