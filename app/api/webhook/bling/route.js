import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  // TODO:
  // 1. Validate the webhook is from Bling.
  // 2. Parse the data to get NFe status, shipping status, tracking code, etc.
  // 3. Update the corresponding order in Firestore with the new information.
  // 4. Potentially send an "Order Shipped" email to the customer.

  console.log('Bling Webhook received:', body);

  return NextResponse.json({ status: 'received' });
}
