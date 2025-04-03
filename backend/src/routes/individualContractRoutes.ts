import express, { Request, Response, NextFunction } from 'express';
import IndividualContractController from '../controllers/IndividualContractController';
const router = express.Router();

// 個別契約一覧取得
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  IndividualContractController.getAllIndividualContracts(req, res);
});

// 特定の個別契約取得
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  IndividualContractController.getIndividualContractById(req, res);
});

// 個別契約作成
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
  IndividualContractController.createIndividualContract(req, res);
});

// 個別契約更新
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  IndividualContractController.updateIndividualContract(req, res);
});

// 個別契約削除
router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  IndividualContractController.deleteIndividualContract(req, res);
});

export default router;
