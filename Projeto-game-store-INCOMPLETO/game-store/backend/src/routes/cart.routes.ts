import { Router } from 'express';
import * as cartController from '../controllers/cart.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authMiddleware);

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.patch('/items/:productId', cartController.updateQuantity);
router.delete('/items/:productId', cartController.removeItem);

export const cartRoutes = router;
