import { Router, RequestHandler } from 'express';
import MemberController from '../controllers/MemberController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 要員ルート
router.get('/', authMiddleware, (async (req, res) => {
  await MemberController.getAllMembers(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await MemberController.getMemberById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await MemberController.createMember(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await MemberController.updateMember(req, res);
}) as RequestHandler);

// adminMiddlewareを別途適用
router.delete('/:id', [authMiddleware, (async (req, res, next) => {
  await adminMiddleware(req, res, next);
}) as RequestHandler], (async (req, res) => {
  await MemberController.deleteMember(req, res);
}) as RequestHandler);

export default router;
