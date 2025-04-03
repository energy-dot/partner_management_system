import express from 'express';
import ProjectController from '../controllers/ProjectController';

const router = express.Router();

// プロジェクト一覧取得
router.get('/', (req, res) => ProjectController.getAllProjects(req, res));

// 特定プロジェクト取得
router.get('/:id', (req, res) => ProjectController.getProjectById(req, res));

// プロジェクト作成
router.post('/', (req, res) => ProjectController.createProject(req, res));

// プロジェクト更新
router.put('/:id', (req, res) => ProjectController.updateProject(req, res));

// プロジェクト削除
router.delete('/:id', (req, res) => ProjectController.deleteProject(req, res));

export default router;
