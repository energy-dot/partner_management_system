import express from 'express';
import CreditCheckController from '../controllers/CreditCheckController';

const router = express.Router();

// 信用調査/反社チェック一覧取得
router.get('/', (req, res) => CreditCheckController.getAllCreditChecks(req, res));

// 特定の信用調査/反社チェック取得
router.get('/:id', (req, res) => CreditCheckController.getCreditCheckById(req, res));

// 信用調査/反社チェック作成
router.post('/', (req, res) => CreditCheckController.createCreditCheck(req, res));

// 信用調査/反社チェック更新
router.put('/:id', (req, res) => CreditCheckController.updateCreditCheck(req, res));

// 信用調査/反社チェック削除
router.delete('/:id', (req, res) => CreditCheckController.deleteCreditCheck(req, res));

export default router;
