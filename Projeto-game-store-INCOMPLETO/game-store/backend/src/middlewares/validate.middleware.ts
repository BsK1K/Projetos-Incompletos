import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.js';

export function validateRegister(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { email, password } = req.body ?? {};
  const message: string[] = [];
  if (!email || typeof email !== 'string' || !email.trim()) {
    message.push('E-mail é obrigatório');
  }
  if (!password || typeof password !== 'string') {
    message.push('Senha é obrigatória');
  } else if (password.length < 6) {
    message.push('Senha deve ter no mínimo 6 caracteres');
  }
  if (message.length > 0) {
    next(new AppError(400, message.join('. ')));
    return;
  }
  next();
}

export function validateLogin(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { email, password } = req.body ?? {};
  const message: string[] = [];
  if (!email || typeof email !== 'string' || !email.trim()) {
    message.push('E-mail é obrigatório');
  }
  if (!password || typeof password !== 'string') {
    message.push('Senha é obrigatória');
  }
  if (message.length > 0) {
    next(new AppError(400, message.join('. ')));
    return;
  }
  next();
}

function parseNumber(value: unknown): number | null {
  if (typeof value === 'number' && !Number.isNaN(value)) return value;
  if (typeof value === 'string') {
    const n = Number(value);
    return Number.isNaN(n) ? null : n;
  }
  return null;
}

export function validateCreateProduct(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const body = req.body ?? {};
  const message: string[] = [];

  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    message.push('Nome é obrigatório');
  }
  if (!body.category || typeof body.category !== 'string' || !body.category.trim()) {
    message.push('Categoria é obrigatória');
  }
  if (!body.platform || typeof body.platform !== 'string' || !body.platform.trim()) {
    message.push('Plataforma é obrigatória');
  }

  const price = parseNumber(body.price);
  if (price === null) {
    message.push('Preço é obrigatório e deve ser um número');
  } else if (price < 0) {
    message.push('Preço não pode ser negativo');
  }

  const discount = parseNumber(body.discountPercentage);
  if (discount !== null && (discount < 0 || discount > 100)) {
    message.push('Desconto deve estar entre 0 e 100');
  }

  const stock = parseNumber(body.stock);
  if (stock !== null && stock < 0) {
    message.push('Estoque não pode ser negativo');
  }

  if (message.length > 0) {
    next(new AppError(400, message.join('. ')));
    return;
  }
  next();
}

export function validateUpdateProduct(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const body = req.body ?? {};
  const message: string[] = [];

  if (body.name !== undefined && (typeof body.name !== 'string' || !body.name.trim())) {
    message.push('Nome deve ser um texto não vazio');
  }
  if (body.category !== undefined && (typeof body.category !== 'string' || !body.category.trim())) {
    message.push('Categoria deve ser um texto não vazio');
  }
  if (body.platform !== undefined && (typeof body.platform !== 'string' || !body.platform.trim())) {
    message.push('Plataforma deve ser um texto não vazio');
  }

  const price = parseNumber(body.price);
  if (price !== null && price < 0) {
    message.push('Preço não pode ser negativo');
  }

  const discount = parseNumber(body.discountPercentage);
  if (discount !== null && (discount < 0 || discount > 100)) {
    message.push('Desconto deve estar entre 0 e 100');
  }

  const stock = parseNumber(body.stock);
  if (stock !== null && stock < 0) {
    message.push('Estoque não pode ser negativo');
  }

  if (message.length > 0) {
    next(new AppError(400, message.join('. ')));
    return;
  }
  next();
}

export function validateCreateReview(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const body = req.body ?? {};
  const rating = parseNumber(body.rating);
  if (rating === null) {
    next(new AppError(400, 'Nota é obrigatória e deve ser um número'));
    return;
  }
  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    next(new AppError(400, 'Nota deve ser um número inteiro de 1 a 5'));
    return;
  }
  if (body.comment !== undefined && typeof body.comment !== 'string') {
    next(new AppError(400, 'Comentário deve ser um texto'));
    return;
  }
  next();
}
