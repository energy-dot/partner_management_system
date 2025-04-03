import express, { Request, Response, NextFunction } from 'express';
import ProjectInvitationController from '../controllers/ProjectInvitationController';
const router = express.Router();

// 案件募集一覧取得
router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  ProjectInvitationController.getAllProjectInvitations(req, res);
});

// 特定の案件募集取得
router.get('/:id', (req: Request, res: Response, next: NextFunction): void => {
  ProjectInvitationController.getProjectInvitationById(req, res);
});

// 案件募集作成
router.post('/', (req: Request, res: Response, next: NextFunction): void => {
  ProjectInvitationController.createProjectInvitation(req, res);
});

// 案件募集更新
router.put('/:id', (req: Request, res: Response, next: NextFunction): void => {
  ProjectInvitationController.updateProjectInvitation(req, res);
});

// 案件募集削除
router.delete('/:id', (req: Request, res: Response, next: NextFunction): void => {
  ProjectInvitationController.deleteProjectInvitation(req, res);
});

export default router;
