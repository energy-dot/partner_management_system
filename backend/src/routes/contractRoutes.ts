import express from 'express';
import ContractController from '../controllers/ContractController';

const router = express.Router();

// 契約一覧取得
router.get('/', (req, res) => ContractController.getAllContracts(req, res));

// 特定の契約取得
router.get('/:id', (req, res) => ContractController.getContractById(req, res));

// 契約作成
router.post('/', (req, res) => ContractController.createContract(req, res));

// 契約更新
router.put('/:id', (req, res) => ContractController.updateContract(req, res));

// 契約削除
router.delete('/:id', (req, res) => ContractController.deleteContract(req, res));

export default router;
