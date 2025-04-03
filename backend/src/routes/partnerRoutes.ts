import express from 'express';
import PartnerController from '../controllers/PartnerController';

const router = express.Router();

// パートナー一覧取得
router.get('/', (req, res) => PartnerController.getAllPartners(req, res));

// 特定パートナー取得
router.get('/:id', (req, res) => PartnerController.getPartnerById(req, res));

// パートナー作成
router.post('/', (req, res) => PartnerController.createPartner(req, res));

// パートナー更新
router.put('/:id', (req, res) => PartnerController.updatePartner(req, res));

// パートナー削除
router.delete('/:id', (req, res) => PartnerController.deletePartner(req, res));

export default router;
