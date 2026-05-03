import { Router } from 'express';
import * as productController from '../controllers/product.controller.js';
import * as reviewController from '../controllers/review.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  validateCreateProduct,
  validateUpdateProduct,
  validateCreateReview,
} from '../middlewares/validate.middleware.js';

const router = Router();

router.get('/', productController.list);
router.get('/:productId/reviews', reviewController.listByProduct);
router.post(
  '/:productId/reviews',
  authMiddleware,
  validateCreateReview,
  reviewController.create
);
router.get('/:id', productController.getById);

router.post(
  '/',
  authMiddleware,
  validateCreateProduct,
  productController.create
);
router.put(
  '/:id',
  authMiddleware,
  validateUpdateProduct,
  productController.update
);
router.delete('/:id', authMiddleware, productController.remove);

export const productRoutes = router;
