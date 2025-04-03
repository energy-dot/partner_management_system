import express, { Request, Response } from 'express';
import ContractController from '../controllers/ContractController';
import { asyncHandler } from './routeHelper';

const router = express.Router();

// 契約一覧取得
router.get('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await ContractController.getAllContracts(req, res);
}));

// 特定の契約取得
router.get('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await ContractController.getContractById(req, res);
}));

// 契約作成
router.post('/', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await ContractController.createContract(req, res);
}));

// 契約更新
router.put('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await ContractController.updateContract(req, res);
}));

// 契約削除
router.delete('/:id', asyncHandler(async (req: Request, res: Response): Promise<void> => {
  await ContractController.deleteContract(req, res);
}));

export default router;
