import { NextResponse } from 'next/server'
import { createClient } from '../../../utils/supabase/client'

export async function GET() {
    const supabase = createClient()
  const { data, error } = await supabase.from('products').select('*')
  if (error) {
    return NextResponse.error()
  }
  return NextResponse.json(data)
}
