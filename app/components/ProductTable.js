'use client'
import { useEffect, useState } from 'react'
import { getProducts, addProduct, deleteProduct  } from '../products/actions'

export default function ProductTable() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
   const [description, setDescription] = useState('')
   const [file, setFile] = useState(null)


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
    const product = {
      name,
      price: parseFloat(price),
      stock: parseInt(stock),
      description
    }

    const inserted = await addProduct(product)
    const newProduct = inserted?.[0]

    if (file && newProduct?.id) {
      const photo_url = await uploadProductImage(file, newProduct.id)
      await updateProductPhoto(newProduct.id, photo_url)
    }

    // Clear form
    setName('')
    setPrice('')
    setStock('')
    setDescription('')
    setFile(null)

    await fetchProducts()
  } catch (err) {
    console.error('Error adding product:', err)
  }
}



  async function handleDeleteProduct(id) {
  try {
    await deleteProduct(id)
    await fetchProducts()
  } catch (err) {
    console.error('Error deleting product:', err)
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
        <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded"
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
              <th className="text-left">Image</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
  <td>{p.name}</td>
  <td>${p.price}</td>
  <td>{p.description}</td>
  <td>{p.stock}</td>
  <td>
    {p.photo_url ? (
      <img src={p.photo_url} alt={p.name} className="w-16 h-16 object-cover" />
    ) : (
      'No image'
    )}
  </td>
  <td>
    <button
      onClick={() => handleDeleteProduct(p.id)}
      className="text-red-600 hover:underline"
    >
      Delete
    </button>
  </td>
</tr>

          ))}
        </tbody>
      </table>
    </div>
  )
}
