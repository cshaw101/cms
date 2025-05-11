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
