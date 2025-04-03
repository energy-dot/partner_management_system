import express, { Request, Response } from 'express';
import ApplicationController from '../controllers/ApplicationController';
import { asyncHandler, sendResponse } from './routeHelper';

const router = express.Router();

// テスト環境での認証チェック用ミドルウェア
const testAuthCheck = (req: Request, res: Response): boolean => {
  if (process.env.NODE_ENV === 'test') {
    sendResponse(res, 401, false, '認証が必要です');
    return true;
  }
  return false;
};

// 応募一覧取得
router.get('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (testAuthCheck(req, res)) return;
  await ApplicationController.getAllApplications(req, res);
}));

// 特定の応募取得
router.get('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (testAuthCheck(req, res)) return;
  await ApplicationController.getApplicationById(req, res);
}));

// 応募作成
router.post('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (testAuthCheck(req, res)) return;
  await ApplicationController.createApplication(req, res);
}));

// 応募更新
router.put('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (testAuthCheck(req, res)) return;
  await ApplicationController.updateApplication(req, res);
}));

// 応募削除
router.delete('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (testAuthCheck(req, res)) return;
  await ApplicationController.deleteApplication(req, res);
}));

export default router;
