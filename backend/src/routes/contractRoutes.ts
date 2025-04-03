import express, { Request, Response, NextFunction } from 'express';
import ContractController from '../controllers/ContractController';
const router = express.Router();

// 契約一覧取得
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  ContractController.getAllContracts(req, res);
});

// 特定の契約取得
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  ContractController.getContractById(req, res);
});

// 契約作成
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
  ContractController.createContract(req, res);
});

// 契約更新
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  ContractController.updateContract(req, res);
});

// 契約削除
router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  ContractController.deleteContract(req, res);
});

export default router;
