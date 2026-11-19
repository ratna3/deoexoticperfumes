import { NextResponse } from 'next/server';
import { getDbProducts, createDbOrder } from '../../lib/db';
import { PAYMENT_METHODS } from '../../data/payment-methods';
import { products as staticProducts } from '../../data/products';
import { ATTARS, BASE_ATTAR_PRICE, PACKAGING_TIERS } from '../../../lib/data/scents';

const MAX_ORDER_ITEMS = 50;
const MAX_ITEM_QUANTITY = 100;

function isValidText(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.length <= maxLength;
}

export async function POST(request) {
  try {
    const contentLength = Number(request.headers.get('content-length') || 0);
    if (contentLength > 16 * 1024) {
      return NextResponse.json(
        { success: false, message: 'Order request is too large' },
        { status: 413 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid order request' },
        { status: 400 }
      );
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: 'Invalid order request' },
        { status: 400 }
      );
    }

    const { customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount, paymentMethod } = body;

    if (
      !isValidText(customerName, 120) ||
      !isValidText(customerEmail, 254) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail) ||
      !isValidText(shippingAddress, 1000) ||
      (customerPhone !== undefined && (typeof customerPhone !== 'string' || customerPhone.length > 30)) ||
      !PAYMENT_METHODS.some((method) => method.id === paymentMethod) ||
      !Array.isArray(items) ||
      items.length === 0 ||
      items.length > MAX_ORDER_ITEMS ||
      !Number.isSafeInteger(totalAmount) ||
      totalAmount <= 0
    ) {
      return NextResponse.json(
        { success: false, message: 'Missing required order details' },
        { status: 400 }
      );
    }

    const catalog = await getDbProducts();
    const productsById = new Map(catalog.map((product) => [String(product.id), product]));
    const staticProductsById = new Map(staticProducts.map((product) => [String(product.id), product]));
    const attarsById = new Map(ATTARS.map((attar) => [attar.id, attar]));
    const normalizedItems = [];

    for (const item of items) {
      if (
        !item ||
        typeof item !== 'object' ||
        !isValidText(String(item.id ?? ''), 128) ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity < 1 ||
        item.quantity > MAX_ITEM_QUANTITY
      ) {
        return NextResponse.json(
          { success: false, message: 'One or more order items are invalid' },
          { status: 400 }
        );
      }

      if (item.isCustomBundle === true) {
        const selectedAttars = item.curatedAttarIds;
        const packaging = PACKAGING_TIERS.find((tier) => tier.id === item.packagingTierId);
        if (
          item.quantity !== 1 ||
          !Array.isArray(selectedAttars) ||
          selectedAttars.length === 0 ||
          selectedAttars.length > MAX_ITEM_QUANTITY ||
          new Set(selectedAttars).size !== selectedAttars.length ||
          selectedAttars.some((id) => !attarsById.has(id)) ||
          !packaging
        ) {
          return NextResponse.json(
            { success: false, message: 'One or more order items are invalid' },
            { status: 400 }
          );
        }

        const curatedAttars = selectedAttars.map((id) => attarsById.get(id));
        const price = selectedAttars.length * BASE_ATTAR_PRICE + packaging.price;
        normalizedItems.push({
          id: item.id,
          name: `Bespoke Attar Coffret (${selectedAttars.length} Fragrances)`,
          price,
          quantity: 1,
          isCustomBundle: true,
          packagingTier: packaging.name,
          curatedAttars: curatedAttars.map((attar) => attar.name),
        });
        continue;
      }

      const product = productsById.get(String(item.id));
      if (!product || product.in_stock === false || product.inStock === false) {
        return NextResponse.json(
          { success: false, message: 'One or more order items are unavailable' },
          { status: 400 }
        );
      }

      const staticProduct = staticProductsById.get(String(product.id));
      const sizes = Array.isArray(product.sizes) ? product.sizes : staticProduct?.sizes || [];
      let variant = null;
      if (item.size !== undefined) {
        if (typeof item.size !== 'string' || item.size.length > 80) {
          return NextResponse.json(
            { success: false, message: 'One or more order items are invalid' },
            { status: 400 }
          );
        }
        variant = sizes.find((option) => option.size === item.size) || null;
        if (!variant && item.size !== product.size) {
          return NextResponse.json(
            { success: false, message: 'One or more order items are invalid' },
            { status: 400 }
          );
        }
      }

      const price = Number(variant?.price ?? product.price);
      if (!Number.isSafeInteger(price) || price <= 0) {
        return NextResponse.json(
          { success: false, message: 'One or more order items are unavailable' },
          { status: 400 }
        );
      }

      normalizedItems.push({
        id: product.id,
        name: product.name,
        size: item.size,
        price,
        quantity: item.quantity,
      });
    }

    const calculatedTotal = normalizedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    if (!Number.isSafeInteger(calculatedTotal) || calculatedTotal !== totalAmount) {
      return NextResponse.json(
        { success: false, message: 'Your cart total changed. Please review your order.' },
        { status: 400 }
      );
    }

    const orderResult = await createDbOrder({
      customerName: customerName.trim(),
      customerEmail: customerEmail.trim(),
      customerPhone,
      shippingAddress: shippingAddress.trim(),
      paymentMethod,
      items: normalizedItems,
      totalAmount: calculatedTotal,
    });

    return NextResponse.json({
      success: true,
      orderId: orderResult.orderId,
      totalAmount: calculatedTotal,
      paymentMethod,
      message: 'Order placed successfully. Thank you for choosing Deo Exotic Attar & Perfume.',
      contactEmail: 'deoexoticattalko@gmail.com'
    });
  } catch (error) {
    console.error('Checkout request failed:', error);
    return NextResponse.json(
      { success: false, message: 'Unable to place your order right now. Please try again.' },
      { status: 500 }
    );
  }
}
