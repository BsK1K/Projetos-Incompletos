export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export interface Game {
  id: string;
  title: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  user?: User | null;
}

export interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  platform: string;
  price: number;
  discountPercentage: number;
  imageUrl: string | null;
  stock: number;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface CartItem {
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

export interface Cart {
  id: string;
  userId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  totalDiscount: number;
  total: number;
}

export interface Review {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  productId: string;
  createdAt: string;
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
}

export interface ProductReviews {
  productId: string;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}
