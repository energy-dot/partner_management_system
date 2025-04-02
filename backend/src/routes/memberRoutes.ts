import { Router } from 'express';
import MemberController from '../controllers/MemberController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 要員ルート
router.get('/', authMiddleware, (req, res) => MemberController.getAllMembers(req, res));
router.get('/:id', authMiddleware, (req, res) => MemberController.getMemberById(req, res));
router.post('/', authMiddleware, (req, res) => MemberController.createMember(req, res));
router.put('/:id', authMiddleware, (req, res) => MemberController.updateMember(req, res));
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => MemberController.deleteMember(req, res));

export default router;
