export interface ReviewResponse {
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
}

export interface CreateReviewInput {
  rating: number;
  comment?: string;
}

export interface ProductReviewsResponse {
  productId: string;
  averageRating: number;
  totalReviews: number;
  reviews: ReviewResponse[];
}
