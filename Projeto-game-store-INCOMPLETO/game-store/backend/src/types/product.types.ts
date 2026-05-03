export interface ProductResponse {
  id: string;
  name: string;
  description: string | null;
  category: string;
  platform: string;
  price: number;
  discountPercentage: number;
  imageUrl: string | null;
  stock: number;
  createdAt: Date;
}

export interface CreateProductInput {
  name: string;
  description?: string;
  category: string;
  platform: string;
  price: number;
  discountPercentage?: number;
  imageUrl?: string;
  stock?: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  category?: string;
  platform?: string;
  price?: number;
  discountPercentage?: number;
  imageUrl?: string;
  stock?: number;
}

export interface ListProductsQuery {
  category?: string;
}
