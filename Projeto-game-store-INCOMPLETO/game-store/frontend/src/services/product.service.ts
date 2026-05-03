import { api } from './api';
import type { Product } from '../types';

export const productService = {
  async list(params?: { category?: string; search?: string }): Promise<Product[]> {
    const { data } = await api.get<Product[]>('/products', { params });
    return data;
  },

  async getById(id: string): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`);
    return data;
  },
};
