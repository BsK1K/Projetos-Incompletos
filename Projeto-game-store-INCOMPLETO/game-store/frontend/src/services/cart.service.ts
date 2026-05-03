import { api } from './api';
import type { Cart } from '../types';

export const cartService = {
  async getCart(): Promise<Cart> {
    const { data } = await api.get<Cart>('/cart');
    return data;
  },

  async addItem(productId: string, quantity: number): Promise<Cart> {
    const { data } = await api.post<Cart>('/cart/items', { productId, quantity });
    return data;
  },

  async updateQuantity(productId: string, quantity: number): Promise<Cart> {
    const { data } = await api.patch<Cart>(`/cart/items/${productId}`, { quantity });
    return data;
  },

  async removeItem(productId: string): Promise<Cart> {
    const { data } = await api.delete<Cart>(`/cart/items/${productId}`);
    return data;
  },
};
