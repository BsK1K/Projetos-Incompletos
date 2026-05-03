import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database.js';
import type {
  JwtPayload,
  UserWithoutPassword,
  RegisterInput,
  LoginInput,
  AuthResult,
} from '../types/auth.types.js';

const SALT_ROUNDS = 10;
const JWT_EXPIRES_IN = '7d';

export const authService = {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  },

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  },

  createToken(payload: JwtPayload): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not configured');
    return jwt.sign(payload, secret, { expiresIn: JWT_EXPIRES_IN });
  },

  verifyToken(token: string): JwtPayload {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not configured');
    return jwt.verify(token, secret) as JwtPayload;
  },

  toUserWithoutPassword(user: {
    id: string;
    email: string;
    name: string | null;
    createdAt: Date;
  }): UserWithoutPassword {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  },

  async register(input: RegisterInput): Promise<AuthResult> {
    const existing = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (existing) {
      throw new Error('EMAIL_ALREADY_REGISTERED');
    }
    const hashedPassword = await this.hashPassword(input.password);
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
          name: input.name ?? null,
        },
      });
      await tx.cart.create({ data: { userId: newUser.id } });
      return newUser;
    });
    const userWithoutPassword = this.toUserWithoutPassword(user);
    const token = this.createToken({
      userId: user.id,
      email: user.email,
    });
    return { user: userWithoutPassword, token };
  },

  async login(input: LoginInput): Promise<AuthResult> {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }
    const isValid = await this.comparePassword(input.password, user.password);
    if (!isValid) {
      throw new Error('INVALID_CREDENTIALS');
    }
    const userWithoutPassword = this.toUserWithoutPassword(user);
    const token = this.createToken({
      userId: user.id,
      email: user.email,
    });
    return { user: userWithoutPassword, token };
  },

  async findUserById(userId: string): Promise<UserWithoutPassword | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });
    return user ? this.toUserWithoutPassword(user) : null;
  },
};
