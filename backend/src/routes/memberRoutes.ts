import express from 'express';
import MemberController from '../controllers/MemberController';

const router = express.Router();

// メンバー一覧取得
router.get('/', (req, res) => MemberController.getAllMembers(req, res));

// 特定メンバー取得
router.get('/:id', (req, res) => MemberController.getMemberById(req, res));

// メンバー作成
router.post('/', (req, res) => MemberController.createMember(req, res));

// メンバー更新
router.put('/:id', (req, res) => MemberController.updateMember(req, res));

// メンバー削除
router.delete('/:id', (req, res) => MemberController.deleteMember(req, res));

export default router;
