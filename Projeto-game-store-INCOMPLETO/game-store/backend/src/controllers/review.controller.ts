import { Request, Response, NextFunction } from 'express';
import { reviewService, PRODUCT_NOT_FOUND } from '../services/review.service.js';
import { AppError } from '../middlewares/errorHandler.js';
import type { JwtPayload } from '../types/auth.types.js';

export async function listByProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { productId } = req.params;
    const result = await reviewService.listByProduct(productId);
    res.json(result);
  } catch (e) {
    if (e instanceof Error && e.message === PRODUCT_NOT_FOUND) {
      next(new AppError(404, 'Produto não encontrado'));
      return;
    }
    next(e);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.user as JwtPayload;
    const { productId } = req.params;
    const { rating, comment } = req.body as { rating: number; comment?: string };
    const review = await reviewService.createOrUpdate(userId, productId, {
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (e) {
    if (e instanceof Error && e.message === PRODUCT_NOT_FOUND) {
      next(new AppError(404, 'Produto não encontrado'));
      return;
    }
    next(e);
  }
}
