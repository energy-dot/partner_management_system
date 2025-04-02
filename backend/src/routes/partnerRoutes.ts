import { Router } from 'express';
import PartnerController from '../controllers/PartnerController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// パートナー会社ルート
router.get('/', authMiddleware, (req, res) => PartnerController.getAllPartners(req, res));
router.get('/:id', authMiddleware, (req, res) => PartnerController.getPartnerById(req, res));
router.post('/', authMiddleware, (req, res) => PartnerController.createPartner(req, res));
router.put('/:id', authMiddleware, (req, res) => PartnerController.updatePartner(req, res));
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => PartnerController.deletePartner(req, res));

export default router;
