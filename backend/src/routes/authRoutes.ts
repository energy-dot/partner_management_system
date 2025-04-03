import express, { Request, Response, NextFunction } from 'express';
import AuthController from '../controllers/AuthController';
const router = express.Router();

// ログイン
router.post('/login', (req: Request, res: Response, next: NextFunction): void => {
  AuthController.login(req, res);
});

// ログアウト
router.post('/logout', (req: Request, res: Response, next: NextFunction): void => {
  AuthController.logout(req, res);
});

export default router;
