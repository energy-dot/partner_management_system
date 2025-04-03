import express from 'express';
import MemberCommunicationController from '../controllers/MemberCommunicationController';

const router = express.Router();

// 要員関連連絡・依頼一覧取得
router.get('/', (req, res) => MemberCommunicationController.getAllMemberCommunications(req, res));

// 特定の要員関連連絡・依頼取得
router.get('/:id', (req, res) => MemberCommunicationController.getMemberCommunicationById(req, res));

// 要員関連連絡・依頼作成
router.post('/', (req, res) => MemberCommunicationController.createMemberCommunication(req, res));

// 要員関連連絡・依頼更新
router.put('/:id', (req, res) => MemberCommunicationController.updateMemberCommunication(req, res));

// 要員関連連絡・依頼削除
router.delete('/:id', (req, res) => MemberCommunicationController.deleteMemberCommunication(req, res));

export default router;
