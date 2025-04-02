import { Router, RequestHandler } from 'express';
import AuthController from '../controllers/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 認証ルート
router.post('/login', (async (req, res) => {
  await AuthController.login(req, res);
}) as RequestHandler);

router.get('/profile', authMiddleware, (async (req, res) => {
  await AuthController.getProfile(req, res);
}) as RequestHandler);

export default router;
