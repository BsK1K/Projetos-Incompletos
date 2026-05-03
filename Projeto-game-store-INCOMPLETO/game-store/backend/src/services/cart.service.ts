import { prisma } from '../config/database.js';
import type {
  CartResponse,
  CartItemResponse,
  AddCartItemInput,
} from '../types/cart.types.js';

const CART_NOT_FOUND = 'CART_NOT_FOUND';
const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';
const INSUFFICIENT_STOCK = 'INSUFFICIENT_STOCK';

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function buildItemResponse(
  item: {
    id: string;
    productId: string;
    quantity: number;
    product: {
      name: string;
      imageUrl: string | null;
      price: unknown;
      discountPercentage: unknown;
    };
  }
): CartItemResponse {
  const unitPrice = Number(item.product.price);
  const discountPct = Number(item.product.discountPercentage);
  const unitPriceAfterDiscount = round2(unitPrice * (1 - discountPct / 100));
  const lineSubtotal = round2(item.quantity * unitPrice);
  const lineDiscount = round2(item.quantity * (unitPrice - unitPriceAfterDiscount));
  const lineTotal = round2(item.quantity * unitPriceAfterDiscount);

  return {
    id: item.id,
    productId: item.productId,
    productName: item.product.name,
    productImageUrl: item.product.imageUrl,
    quantity: item.quantity,
    unitPrice,
    discountPercentage: discountPct,
    unitPriceAfterDiscount,
    lineSubtotal,
    lineDiscount,
    lineTotal,
  };
}

export const cartService = {
  async getOrCreateCart(userId: string): Promise<{ id: string }> {
    let cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }
    return { id: cart.id };
  },

  async getCart(userId: string): Promise<CartResponse | null> {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart) return null;

    const items: CartItemResponse[] = cart.items.map((item) =>
      buildItemResponse({
        id: item.id,
        productId: item.productId,
        quantity: item.quantity,
        product: {
          name: item.product.name,
          imageUrl: item.product.imageUrl,
          price: item.product.price,
          discountPercentage: item.product.discountPercentage,
        },
      })
    );

    let subtotal = 0;
    let totalDiscount = 0;
    for (const it of items) {
      subtotal += it.lineSubtotal;
      totalDiscount += it.lineDiscount;
    }
    const total = round2(subtotal - totalDiscount);

    return {
      id: cart.id,
      userId: cart.userId,
      createdAt: cart.createdAt,
      items,
      subtotal: round2(subtotal),
      totalDiscount: round2(totalDiscount),
      total,
    };
  },

  async addItem(userId: string, input: AddCartItemInput): Promise<CartResponse> {
    const { productId, quantity } = input;
    if (quantity < 1) throw new Error('QUANTITY_MUST_BE_POSITIVE');

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new Error(PRODUCT_NOT_FOUND);
    if (product.stock < quantity) throw new Error(INSUFFICIENT_STOCK);

    const { id: cartId } = await this.getOrCreateCart(userId);

    await prisma.cartItem.upsert({
      where: {
        cartId_productId: { cartId, productId },
      },
      create: {
        cartId,
        productId,
        quantity,
      },
      update: {
        quantity: { increment: quantity },
      },
    });

    const cart = await this.getCart(userId);
    if (!cart) throw new Error(CART_NOT_FOUND);
    return cart;
  },

  async updateQuantity(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<CartResponse> {
    if (quantity < 0) throw new Error('QUANTITY_MUST_BE_NON_NEGATIVE');
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new Error(CART_NOT_FOUND);

    if (quantity === 0) {
      await prisma.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      });
    } else {
      const product = await prisma.product.findUnique({ where: { id: productId } });
      if (!product) throw new Error(PRODUCT_NOT_FOUND);
      if (product.stock < quantity) throw new Error(INSUFFICIENT_STOCK);

      await prisma.cartItem.upsert({
        where: {
          cartId_productId: { cartId: cart.id, productId },
        },
        create: { cartId: cart.id, productId, quantity },
        update: { quantity },
      });
    }

    const updated = await this.getCart(userId);
    if (!updated) throw new Error(CART_NOT_FOUND);
    return updated;
  },

  async removeItem(userId: string, productId: string): Promise<CartResponse> {
    const cart = await prisma.cart.findUnique({ where: { userId } });
    if (!cart) throw new Error(CART_NOT_FOUND);

    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId },
    });

    const updated = await this.getCart(userId);
    if (!updated) throw new Error(CART_NOT_FOUND);
    return updated;
  },
};

export { CART_NOT_FOUND, PRODUCT_NOT_FOUND, INSUFFICIENT_STOCK };
