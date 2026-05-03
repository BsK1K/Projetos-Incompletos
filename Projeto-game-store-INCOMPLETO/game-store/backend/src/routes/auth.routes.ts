import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { validateRegister, validateLogin } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);

router.get('/me', authMiddleware, authController.me);

export const authRoutes = router;
