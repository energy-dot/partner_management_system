import { Router, RequestHandler } from 'express';
import CreditCheckController from '../controllers/CreditCheckController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 信用調査/反社チェックルート
router.post('/:id/credit-check', [authMiddleware, (async (req, res, next) => {
  await adminMiddleware(req, res, next);
}) as RequestHandler], (async (req, res) => {
  await CreditCheckController.performCreditCheck(req, res);
}) as RequestHandler);

router.post('/:id/anti-social-check', [authMiddleware, (async (req, res, next) => {
  await adminMiddleware(req, res, next);
}) as RequestHandler], (async (req, res) => {
  await CreditCheckController.performAntiSocialCheck(req, res);
}) as RequestHandler);

router.get('/:id/check-history', authMiddleware, (async (req, res) => {
  await CreditCheckController.getCheckHistory(req, res);
}) as RequestHandler);

export default router;
