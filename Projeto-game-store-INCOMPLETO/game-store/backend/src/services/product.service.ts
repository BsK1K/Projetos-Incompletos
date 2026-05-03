import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../config/database.js';
import type {
  ProductResponse,
  CreateProductInput,
  UpdateProductInput,
  ListProductsQuery,
} from '../types/product.types.js';

const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';

function toResponse(product: {
  id: string;
  name: string;
  description: string | null;
  category: string;
  platform: string;
  price: Decimal;
  discountPercentage: Decimal;
  imageUrl: string | null;
  stock: number;
  createdAt: Date;
}): ProductResponse {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    platform: product.platform,
    price: Number(product.price),
    discountPercentage: Number(product.discountPercentage),
    imageUrl: product.imageUrl,
    stock: product.stock,
    createdAt: product.createdAt,
  };
}

export const productService = {
  async list(query: ListProductsQuery): Promise<ProductResponse[]> {
    const where = query.category
      ? { category: { equals: query.category, mode: 'insensitive' as const } }
      : {};
    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    return products.map(toResponse);
  },

  async getById(id: string): Promise<ProductResponse | null> {
    const product = await prisma.product.findUnique({ where: { id } });
    return product ? toResponse(product) : null;
  },

  async create(input: CreateProductInput): Promise<ProductResponse> {
    const product = await prisma.product.create({
      data: {
        name: input.name.trim(),
        description: input.description?.trim() ?? null,
        category: input.category.trim(),
        platform: input.platform.trim(),
        price: new Decimal(input.price),
        discountPercentage: new Decimal(input.discountPercentage ?? 0),
        imageUrl: input.imageUrl?.trim() ?? null,
        stock: input.stock ?? 0,
      },
    });
    return toResponse(product);
  },

  async update(id: string, input: UpdateProductInput): Promise<ProductResponse> {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error(PRODUCT_NOT_FOUND);

    const data: Parameters<typeof prisma.product.update>[0]['data'] = {};
    if (input.name !== undefined) data.name = input.name.trim();
    if (input.description !== undefined) data.description = input.description?.trim() ?? null;
    if (input.category !== undefined) data.category = input.category.trim();
    if (input.platform !== undefined) data.platform = input.platform.trim();
    if (input.price !== undefined) data.price = new Decimal(input.price);
    if (input.discountPercentage !== undefined)
      data.discountPercentage = new Decimal(input.discountPercentage);
    if (input.imageUrl !== undefined) data.imageUrl = input.imageUrl?.trim() ?? null;
    if (input.stock !== undefined) data.stock = input.stock;

    const product = await prisma.product.update({ where: { id }, data });
    return toResponse(product);
  },

  async delete(id: string): Promise<void> {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error(PRODUCT_NOT_FOUND);
    await prisma.product.delete({ where: { id } });
  },
};

export { PRODUCT_NOT_FOUND };
