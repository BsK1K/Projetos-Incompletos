import { api } from './api';
import type { Game } from '../types';

export const gameService = {
  async list(): Promise<Game[]> {
    const { data } = await api.get<Game[]>('/games');
    return data;
  },

  async getById(id: string): Promise<Game> {
    const { data } = await api.get<Game>(`/games/${id}`);
    return data;
  },

  async create(payload: { title: string; description?: string; price: number; imageUrl?: string }): Promise<Game> {
    const { data } = await api.post<Game>('/games', payload);
    return data;
  },

  async update(
    id: string,
    payload: { title?: string; description?: string; price?: number; imageUrl?: string }
  ): Promise<Game> {
    const { data } = await api.put<Game>(`/games/${id}`, payload);
    return data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/games/${id}`);
  },
};
