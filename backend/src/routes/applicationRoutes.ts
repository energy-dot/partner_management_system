import { Router, RequestHandler } from 'express';
import ApplicationController from '../controllers/ApplicationController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 応募ルート
router.get('/', authMiddleware, (async (req, res) => {
  await ApplicationController.getAllApplications(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await ApplicationController.getApplicationById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await ApplicationController.createApplication(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await ApplicationController.updateApplication(req, res);
}) as RequestHandler);

router.post('/:id/approve', authMiddleware, (async (req, res) => {
  await ApplicationController.approveApplication(req, res);
}) as RequestHandler);

router.post('/:id/reject', authMiddleware, (async (req, res) => {
  await ApplicationController.rejectApplication(req, res);
}) as RequestHandler);

export default router;
