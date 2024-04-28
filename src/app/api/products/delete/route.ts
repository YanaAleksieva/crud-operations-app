import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (request.method === 'POST') {
    return NextResponse.json({ message: "Successful execution of request" }, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}