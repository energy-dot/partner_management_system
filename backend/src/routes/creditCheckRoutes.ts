import express, { Request, Response } from 'express';
import CreditCheckController from '../controllers/CreditCheckController';
import { asyncHandler } from './routeHelper';

const router = express.Router();

// 信用調査/反社チェック一覧取得
router.get('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await CreditCheckController.getAllCreditChecks(req, res);
}));

// 特定の信用調査/反社チェック取得
router.get('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await CreditCheckController.getCreditCheckById(req, res);
}));

// 信用調査/反社チェック作成
router.post('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await CreditCheckController.createCreditCheck(req, res);
}));

// 信用調査/反社チェック更新
router.put('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await CreditCheckController.updateCreditCheck(req, res);
}));

// 信用調査/反社チェック削除
router.delete('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await CreditCheckController.deleteCreditCheck(req, res);
}));

export default router;
