import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service.js';
import { AppError } from '../middlewares/errorHandler.js';
import type { JwtPayload } from '../types/auth.types.js';

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password, name } = req.body as {
      email: string;
      password: string;
      name?: string;
    };
    const result = await authService.register({ email, password, name });
    res.status(201).json(result);
  } catch (e) {
    if (e instanceof Error && e.message === 'EMAIL_ALREADY_REGISTERED') {
      next(new AppError(409, 'Este e-mail já está cadastrado'));
      return;
    }
    next(e);
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (e) {
    if (e instanceof Error && e.message === 'INVALID_CREDENTIALS') {
      next(new AppError(401, 'E-mail ou senha inválidos'));
      return;
    }
    next(e);
  }
}

export async function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const payload = req.user as JwtPayload;
    const user = await authService.findUserById(payload.userId);
    if (!user) {
      next(new AppError(404, 'Usuário não encontrado'));
      return;
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
}
