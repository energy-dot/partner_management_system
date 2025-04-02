import { Router, RequestHandler } from 'express';
import MemberEvaluationController from '../controllers/MemberEvaluationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 要員評価ルート
router.get('/', authMiddleware, (async (req, res) => {
  await MemberEvaluationController.getAllEvaluations(req, res);
}) as RequestHandler);

router.get('/member/:memberId', authMiddleware, (async (req, res) => {
  await MemberEvaluationController.getEvaluationsByMember(req, res);
}) as RequestHandler);

router.get('/user/:userId', authMiddleware, (async (req, res) => {
  await MemberEvaluationController.getEvaluationsByUser(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await MemberEvaluationController.getEvaluationById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await MemberEvaluationController.createEvaluation(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await MemberEvaluationController.updateEvaluation(req, res);
}) as RequestHandler);

router.delete('/:id', authMiddleware, (async (req, res) => {
  await MemberEvaluationController.deleteEvaluation(req, res);
}) as RequestHandler);

export default router;
