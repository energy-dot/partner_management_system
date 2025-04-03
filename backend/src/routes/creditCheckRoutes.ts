import express, { Request, Response, NextFunction } from 'express';
import CreditCheckController from '../controllers/CreditCheckController';
const router = express.Router();

// 信用調査/反社チェック一覧取得
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  CreditCheckController.getAllCreditChecks(req, res);
});

// 特定の信用調査/反社チェック取得
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  CreditCheckController.getCreditCheckById(req, res);
});

// 信用調査/反社チェック作成
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
  CreditCheckController.createCreditCheck(req, res);
});

// 信用調査/反社チェック更新
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  CreditCheckController.updateCreditCheck(req, res);
});

// 信用調査/反社チェック削除
router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  CreditCheckController.deleteCreditCheck(req, res);
});

export default router;
