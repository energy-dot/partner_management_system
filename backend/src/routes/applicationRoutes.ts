import { Router } from 'express';
import ApplicationController from '../controllers/ApplicationController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 応募ルート
router.get('/', authMiddleware, (req, res) => ApplicationController.getAllApplications(req, res));
router.get('/:id', authMiddleware, (req, res) => ApplicationController.getApplicationById(req, res));
router.post('/', authMiddleware, (req, res) => ApplicationController.createApplication(req, res));
router.put('/:id', authMiddleware, (req, res) => ApplicationController.updateApplication(req, res));
router.post('/:id/approve', authMiddleware, (req, res) => ApplicationController.approveApplication(req, res));
router.post('/:id/reject', authMiddleware, (req, res) => ApplicationController.rejectApplication(req, res));

export default router;
