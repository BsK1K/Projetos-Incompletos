import { prisma } from '../config/database.js';
import type { ReviewResponse, CreateReviewInput, ProductReviewsResponse } from '../types/review.types.js';

const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';

function toReviewResponse(review: {
  id: string;
  rating: number;
  comment: string | null;
  userId: string;
  productId: string;
  createdAt: Date;
  user?: {
    id: string;
    name: string | null;
    email: string;
  };
}): ReviewResponse {
  return {
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    userId: review.userId,
    productId: review.productId,
    createdAt: review.createdAt,
    ...(review.user && { user: review.user }),
  };
}

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export const reviewService = {
  async listByProduct(productId: string): Promise<ProductReviewsResponse> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    if (!product) throw new Error(PRODUCT_NOT_FOUND);

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    const totalReviews = reviews.length;
    const averageRating =
      totalReviews === 0
        ? 0
        : round1(
            reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          );

    return {
      productId,
      averageRating,
      totalReviews,
      reviews: reviews.map((r) => toReviewResponse({ ...r, user: r.user })),
    };
  },

  async createOrUpdate(
    userId: string,
    productId: string,
    input: CreateReviewInput
  ): Promise<ReviewResponse> {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      select: { id: true },
    });
    if (!product) throw new Error(PRODUCT_NOT_FOUND);

    const existing = await prisma.review.findFirst({
      where: { userId, productId },
    });

    const data = {
      rating: input.rating,
      comment: input.comment?.trim() ?? null,
    };

    const review = existing
      ? await prisma.review.update({
          where: { id: existing.id },
          data,
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        })
      : await prisma.review.create({
          data: {
            userId,
            productId,
            ...data,
          },
          include: {
            user: {
              select: { id: true, name: true, email: true },
            },
          },
        });

    return toReviewResponse({ ...review, user: review.user });
  },
};

export { PRODUCT_NOT_FOUND };
