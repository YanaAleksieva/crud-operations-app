import { NextResponse } from 'next/server'
import data from '../../../data/permissions.json';
 
export async function GET(request: Request) {
  return NextResponse.json({ data })
}