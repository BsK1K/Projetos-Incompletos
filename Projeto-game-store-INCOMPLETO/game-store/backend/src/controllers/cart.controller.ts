import { Request, Response, NextFunction } from 'express';
import { cartService, CART_NOT_FOUND, PRODUCT_NOT_FOUND, INSUFFICIENT_STOCK } from '../services/cart.service.js';
import { AppError } from '../middlewares/errorHandler.js';
import type { JwtPayload } from '../types/auth.types.js';

export async function getCart(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.user as JwtPayload;
    let cart = await cartService.getCart(userId);
    if (!cart) {
      await cartService.getOrCreateCart(userId);
      const created = await cartService.getCart(userId);
      if (!created) {
        next(new AppError(500, 'Erro ao obter carrinho'));
        return;
      }
      res.json(created);
      return;
    }
    res.json(cart);
  } catch (e) {
    next(e);
  }
}

export async function addItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.user as JwtPayload;
    const { productId, quantity } = req.body as { productId?: string; quantity?: number };
    if (!productId || typeof productId !== 'string' || !productId.trim()) {
      next(new AppError(400, 'productId é obrigatório'));
      return;
    }
    const qty = Number(quantity);
    if (Number.isNaN(qty) || qty < 1) {
      next(new AppError(400, 'quantity deve ser um número maior que zero'));
      return;
    }
    const cart = await cartService.addItem(userId, { productId: productId.trim(), quantity: qty });
    res.status(201).json(cart);
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === PRODUCT_NOT_FOUND) {
        next(new AppError(404, 'Produto não encontrado'));
        return;
      }
      if (e.message === INSUFFICIENT_STOCK) {
        next(new AppError(400, 'Quantidade indisponível em estoque'));
        return;
      }
      if (e.message === 'QUANTITY_MUST_BE_POSITIVE') {
        next(new AppError(400, 'Quantidade deve ser maior que zero'));
        return;
      }
    }
    next(e);
  }
}

export async function updateQuantity(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.user as JwtPayload;
    const { productId } = req.params;
    const { quantity } = req.body as { quantity?: number };
    const qty = Number(quantity);
    if (Number.isNaN(qty) || qty < 0) {
      next(new AppError(400, 'quantity deve ser um número maior ou igual a zero'));
      return;
    }
    const cart = await cartService.updateQuantity(userId, productId, qty);
    res.json(cart);
  } catch (e) {
    if (e instanceof Error) {
      if (e.message === CART_NOT_FOUND) {
        next(new AppError(404, 'Carrinho não encontrado'));
        return;
      }
      if (e.message === PRODUCT_NOT_FOUND) {
        next(new AppError(404, 'Produto não encontrado'));
        return;
      }
      if (e.message === INSUFFICIENT_STOCK) {
        next(new AppError(400, 'Quantidade indisponível em estoque'));
        return;
      }
      if (e.message === 'QUANTITY_MUST_BE_NON_NEGATIVE') {
        next(new AppError(400, 'Quantidade deve ser maior ou igual a zero'));
        return;
      }
    }
    next(e);
  }
}

export async function removeItem(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.user as JwtPayload;
    const { productId } = req.params;
    const cart = await cartService.removeItem(userId, productId);
    res.json(cart);
  } catch (e) {
    if (e instanceof Error && e.message === CART_NOT_FOUND) {
      next(new AppError(404, 'Carrinho não encontrado'));
      return;
    }
    next(e);
  }
}
