'use client'
import { createClient } from '../../utils/supabase/client'

export async function getProducts() {
  const supabase = createClient()
  const { data, error } = await supabase.from('products').select('*')
  if (error) throw error
  return data
}

export async function addProduct(product) {
  const supabase = createClient()
  const { data, error } = await supabase.from('products').insert([product])
  
  if (error) {
    console.error('Supabase insert error:', error)
    throw new Error(error.message)
  }

  return data
}

export async function deleteProduct(id) {
  const supabase = createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  
  if (error) {
    console.error('Supabase delete error:', error)
    throw new Error(error.message)
  }
}

export async function uploadProductImage(file, productId) {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const filePath = `products/${productId}-${Date.now()}.${fileExt}`

  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(filePath, file)

  if (error) {
    console.error('Upload error:', error)
    throw new Error('Failed to upload image')
  }

  const { data: publicUrlData } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath)

  return publicUrlData.publicUrl
}

export async function updateProductPhoto(productId, photo_url) {
  const supabase = createClient()
  const { error } = await supabase
    .from('products')
    .update({ photo_url })
    .eq('id', productId)

  if (error) {
    console.error('Failed to update product photo:', error)
    throw new Error('Could not update product photo')
  }
}

