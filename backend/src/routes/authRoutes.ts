import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 認証ルート
router.post('/login', (req, res) => AuthController.login(req, res));
router.get('/profile', authMiddleware, (req, res) => AuthController.getProfile(req, res));

export default router;
