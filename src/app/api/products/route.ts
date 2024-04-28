import { NextResponse } from 'next/server'
import { productsList } from '../../../data/products-list ';
 
export async function GET(request: Request) {
  return NextResponse.json(productsList.products)
}