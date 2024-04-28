import { productsList } from "@/data/products-list ";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const newProduct = await request.json();
    productsList.products.push(newProduct);
    return NextResponse.json({ message: 'Product added successfully', product: newProduct }, { status: 201 });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}