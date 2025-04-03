import express from 'express';
import MemberEvaluationController from '../controllers/MemberEvaluationController';

const router = express.Router();

// 要員評価一覧取得
router.get('/', (req, res) => MemberEvaluationController.getAllMemberEvaluations(req, res));

// 特定の要員評価取得
router.get('/:id', (req, res) => MemberEvaluationController.getMemberEvaluationById(req, res));

// 要員評価作成
router.post('/', (req, res) => MemberEvaluationController.createMemberEvaluation(req, res));

// 要員評価更新
router.put('/:id', (req, res) => MemberEvaluationController.updateMemberEvaluation(req, res));

// 要員評価削除
router.delete('/:id', (req, res) => MemberEvaluationController.deleteMemberEvaluation(req, res));

export default router;
