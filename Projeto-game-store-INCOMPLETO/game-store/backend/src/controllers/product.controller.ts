import { Request, Response, NextFunction } from 'express';
import { productService, PRODUCT_NOT_FOUND } from '../services/product.service.js';
import { AppError } from '../middlewares/errorHandler.js';
import type { CreateProductInput, UpdateProductInput } from '../types/product.types.js';

export async function list(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const category = typeof req.query.category === 'string' ? req.query.category.trim() : undefined;
    const products = await productService.list({ category });
    res.json(products);
  } catch (e) {
    next(e);
  }
}

export async function getById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const product = await productService.getById(id);
    if (!product) {
      next(new AppError(404, 'Produto não encontrado'));
      return;
    }
    res.json(product);
  } catch (e) {
    next(e);
  }
}

export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const body = req.body as Record<string, unknown>;
    const input: CreateProductInput = {
      name: body.name as string,
      description: body.description as string | undefined,
      category: body.category as string,
      platform: body.platform as string,
      price: Number(body.price),
      discountPercentage: body.discountPercentage !== undefined ? Number(body.discountPercentage) : undefined,
      imageUrl: body.imageUrl as string | undefined,
      stock: body.stock !== undefined ? Number(body.stock) : undefined,
    };
    const product = await productService.create(input);
    res.status(201).json(product);
  } catch (e) {
    next(e);
  }
}

export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const body = req.body as Record<string, unknown>;
    const input: UpdateProductInput = {};
    if (body.name !== undefined) input.name = body.name as string;
    if (body.description !== undefined) input.description = body.description as string;
    if (body.category !== undefined) input.category = body.category as string;
    if (body.platform !== undefined) input.platform = body.platform as string;
    if (body.price !== undefined) input.price = Number(body.price);
    if (body.discountPercentage !== undefined) input.discountPercentage = Number(body.discountPercentage);
    if (body.imageUrl !== undefined) input.imageUrl = body.imageUrl as string;
    if (body.stock !== undefined) input.stock = Number(body.stock);

    const product = await productService.update(id, input);
    res.json(product);
  } catch (e) {
    if (e instanceof Error && e.message === PRODUCT_NOT_FOUND) {
      next(new AppError(404, 'Produto não encontrado'));
      return;
    }
    next(e);
  }
}

export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await productService.delete(id);
    res.status(204).send();
  } catch (e) {
    if (e instanceof Error && e.message === PRODUCT_NOT_FOUND) {
      next(new AppError(404, 'Produto não encontrado'));
      return;
    }
    next(e);
  }
}
