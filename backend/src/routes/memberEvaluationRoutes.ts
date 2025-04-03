import express, { Request, Response, NextFunction } from 'express';
import MemberEvaluationController from '../controllers/MemberEvaluationController';
const router = express.Router();

// 要員評価一覧取得
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  MemberEvaluationController.getAllMemberEvaluations(req, res);
});

// 特定の要員評価取得
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  MemberEvaluationController.getMemberEvaluationById(req, res);
});

// 要員評価作成
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
  MemberEvaluationController.createMemberEvaluation(req, res);
});

// 要員評価更新
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  MemberEvaluationController.updateMemberEvaluation(req, res);
});

// 要員評価削除
router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  MemberEvaluationController.deleteMemberEvaluation(req, res);
});

export default router;
