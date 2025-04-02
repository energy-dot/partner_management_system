import { Router } from 'express';
import ProjectController from '../controllers/ProjectController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 案件ルート
router.get('/', authMiddleware, (req, res) => ProjectController.getAllProjects(req, res));
router.get('/:id', authMiddleware, (req, res) => ProjectController.getProjectById(req, res));
router.post('/', authMiddleware, (req, res) => ProjectController.createProject(req, res));
router.put('/:id', authMiddleware, (req, res) => ProjectController.updateProject(req, res));
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => ProjectController.deleteProject(req, res));

export default router;
