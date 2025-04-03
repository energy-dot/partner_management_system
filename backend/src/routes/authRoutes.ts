import express, { Request, Response } from 'express';
import AuthController from '../controllers/AuthController';
import { asyncHandler } from './routeHelper';

const router = express.Router();

// ログイン
router.post('/login', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await AuthController.login(req, res);
}));

// ログアウト
router.post('/logout', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await AuthController.logout(req, res);
}));

export default router;
