import { api } from './api';
import type { ProductReviews, Review } from '../types';

export const reviewService = {
  async listByProduct(productId: string): Promise<ProductReviews> {
    const { data } = await api.get<ProductReviews>(`/products/${productId}/reviews`);
    return data;
  },

  async create(productId: string, rating: number, comment?: string): Promise<Review> {
    const { data } = await api.post<Review>(`/products/${productId}/reviews`, {
      rating,
      comment: comment?.trim() || undefined,
    });
    return data;
  },
};
