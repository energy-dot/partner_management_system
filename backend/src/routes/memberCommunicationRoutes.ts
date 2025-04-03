import express, { Request, Response, NextFunction } from 'express';
import MemberCommunicationController from '../controllers/MemberCommunicationController';
const router = express.Router();

// 要員関連連絡・依頼一覧取得
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  MemberCommunicationController.getAllMemberCommunications(req, res);
});

// 特定の要員関連連絡・依頼取得
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  MemberCommunicationController.getMemberCommunicationById(req, res);
});

// 要員関連連絡・依頼作成
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
  MemberCommunicationController.createMemberCommunication(req, res);
});

// 要員関連連絡・依頼更新
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  MemberCommunicationController.updateMemberCommunication(req, res);
});

// 要員関連連絡・依頼削除
router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  MemberCommunicationController.deleteMemberCommunication(req, res);
});

export default router;
