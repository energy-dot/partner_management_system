import { Router, RequestHandler } from 'express';
import ProjectInvitationController from '../controllers/ProjectInvitationController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 案件募集送信ルート
router.get('/', authMiddleware, (async (req, res) => {
  await ProjectInvitationController.getAllInvitations(req, res);
}) as RequestHandler);

router.get('/project/:projectId', authMiddleware, (async (req, res) => {
  await ProjectInvitationController.getInvitationsByProject(req, res);
}) as RequestHandler);

router.get('/partner/:partnerId', authMiddleware, (async (req, res) => {
  await ProjectInvitationController.getInvitationsByPartner(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await ProjectInvitationController.getInvitationById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await ProjectInvitationController.createInvitation(req, res);
}) as RequestHandler);

router.post('/bulk', authMiddleware, (async (req, res) => {
  await ProjectInvitationController.createBulkInvitations(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await ProjectInvitationController.updateInvitation(req, res);
}) as RequestHandler);

router.post('/:id/cancel', authMiddleware, (async (req, res) => {
  await ProjectInvitationController.cancelInvitation(req, res);
}) as RequestHandler);

export default router;
