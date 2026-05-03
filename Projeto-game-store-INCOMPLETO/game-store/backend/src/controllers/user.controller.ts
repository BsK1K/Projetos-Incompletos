import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database.js';
import { AppError } from '../middlewares/errorHandler.js';
import type { JwtPayload } from '../types/auth.types.js';

export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { userId } = req.user as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    if (!user) {
      next(new AppError(404, 'User not found'));
      return;
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
}
