import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import UserController from '../controllers/UserController';
const router = express.Router();

// ユーザー一覧取得
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  UserController.getAllUsers(req, res);
});

// 特定ユーザー取得
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  UserController.getUserById(req, res);
});

// ユーザー作成
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
  UserController.createUser(req, res);
});

// ユーザー更新
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  UserController.updateUser(req, res);
});

// ユーザー削除
router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  UserController.deleteUser(req, res);
});

export default router;
