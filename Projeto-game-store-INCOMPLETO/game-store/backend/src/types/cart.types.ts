export interface CartItemResponse {
  id: string;
  productId: string;
  productName: string;
  productImageUrl: string | null;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  unitPriceAfterDiscount: number;
  lineSubtotal: number;
  lineDiscount: number;
  lineTotal: number;
}

export interface CartResponse {
  id: string;
  userId: string;
  createdAt: Date;
  items: CartItemResponse[];
  subtotal: number;
  totalDiscount: number;
  total: number;
}

export interface AddCartItemInput {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemInput {
  quantity: number;
}
