import { NextResponse } from 'next/server';

// CREATE a new order
export async function POST(request) {
  const body = await request.json();
  // TODO: Create order in Firestore
  return NextResponse.json({ message: "Order created", data: body });
}

// GET orders (e.g., for a specific user)
export async function GET(request) {
  // TODO: Get orders from Firestore, filtering by user
  return NextResponse.json({ message: "Get orders" });
}
