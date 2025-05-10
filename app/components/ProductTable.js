'use client'
import { useEffect, useState } from 'react'
import { getProducts, addProduct } from '../products/actions'

export default function ProductTable() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
   const [description, setDescription] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.error('Error loading products:', err)
    }
  }

  async function handleAddProduct(e) {
    e.preventDefault()
    try {
      await addProduct({ name, price: parseFloat(price), stock: parseInt(stock), description })
      setName('')
      setPrice('')
      setStock('')
      setDescription('')
      await fetchProducts()
    } catch (err) {
      console.error('Error adding product:', err)
    }
  }

  return (
    <div>
      <form onSubmit={handleAddProduct} className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="border p-2 rounded"
          required
        />
          <input
          type="text"
          placeholder="Product Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={e => setStock(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>

      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Price</th>
            <th className="text-left">Description</th>
            <th className="text-left">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.description}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
