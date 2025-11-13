import { NextResponse } from 'next/server';

// GET a single product
export async function GET(request, { params }) {
  const { id } = params;
  // TODO: Fetch product from Firestore
  return NextResponse.json({ message: `Get product ${id}` });
}

// UPDATE a product
export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  // TODO: Update product in Firestore
  return NextResponse.json({ message: `Update product ${id}`, data: body });
}

// DELETE a product
export async function DELETE(request, { params }) {
  const { id } = params;
  // TODO: Delete product from Firestore
  return NextResponse.json({ message: `Delete product ${id}` });
}
