import express from 'express';
import ProjectInvitationController from '../controllers/ProjectInvitationController';

const router = express.Router();

// 案件募集一覧取得
router.get('/', (req, res) => ProjectInvitationController.getAllProjectInvitations(req, res));

// 特定の案件募集取得
router.get('/:id', (req, res) => ProjectInvitationController.getProjectInvitationById(req, res));

// 案件募集作成
router.post('/', (req, res) => ProjectInvitationController.createProjectInvitation(req, res));

// 案件募集更新
router.put('/:id', (req, res) => ProjectInvitationController.updateProjectInvitation(req, res));

// 案件募集削除
router.delete('/:id', (req, res) => ProjectInvitationController.deleteProjectInvitation(req, res));

export default router;
