import { NextResponse } from 'next/server';

// CREATE a new product
export async function POST(request) {
  const body = await request.json();
  // TODO: Create product in Firestore
  console.log("Creating new product", body);
  return NextResponse.json({ message: "Product created successfully", data: body });
}

// GET all products
export async function GET(request) {
    // TODO: Fetch all products from Firestore
    return NextResponse.json({ message: "List all products" });
}
