import { NextResponse } from 'next/server';
import { createDbOrder } from '../../lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount } = body;

    if (!customerName || !customerEmail || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Missing required order details' },
        { status: 400 }
      );
    }

    const orderResult = await createDbOrder({
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      totalAmount
    });

    return NextResponse.json({
      success: true,
      orderId: orderResult.orderId,
      message: 'Order placed successfully. Thank you for choosing Deo Exotic Attar & Perfume.',
      contactEmail: 'deoexoticattalko@gmail.com'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
