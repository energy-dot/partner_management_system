import { Router, RequestHandler } from 'express';
import ProjectController from '../controllers/ProjectController';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware';

const router = Router();

// 案件ルート
router.get('/', authMiddleware, (async (req, res) => {
  await ProjectController.getAllProjects(req, res);
}) as RequestHandler);

router.get('/:id', authMiddleware, (async (req, res) => {
  await ProjectController.getProjectById(req, res);
}) as RequestHandler);

router.post('/', authMiddleware, (async (req, res) => {
  await ProjectController.createProject(req, res);
}) as RequestHandler);

router.put('/:id', authMiddleware, (async (req, res) => {
  await ProjectController.updateProject(req, res);
}) as RequestHandler);

// adminMiddlewareを別途適用
router.delete('/:id', [authMiddleware, (async (req, res, next) => {
  await adminMiddleware(req, res, next);
}) as RequestHandler], (async (req, res) => {
  await ProjectController.deleteProject(req, res);
}) as RequestHandler);

export default router;
