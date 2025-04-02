import { Router, RequestHandler } from 'express';
import PartnerController from '../controllers/PartnerController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// パートナー会社ルート
router.get('/', authMiddleware, (async (req, res) => {
  await PartnerController.getAllPartners(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await PartnerController.getPartnerById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await PartnerController.createPartner(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await PartnerController.updatePartner(req, res);
}) as RequestHandler);

// adminMiddlewareを別途適用
router.delete('/:id', [authMiddleware, (async (req, res, next) => {
  await adminMiddleware(req, res, next);
}) as RequestHandler], (async (req, res) => {
  await PartnerController.deletePartner(req, res);
}) as RequestHandler);

export default router;
