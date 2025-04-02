"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProjectController_1 = __importDefault(require("../controllers/ProjectController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// 案件ルート
router.get('/', authMiddleware_1.authMiddleware, (req, res) => ProjectController_1.default.getAllProjects(req, res));
router.get('/:id', authMiddleware_1.authMiddleware, (req, res) => ProjectController_1.default.getProjectById(req, res));
router.post('/', authMiddleware_1.authMiddleware, (req, res) => ProjectController_1.default.createProject(req, res));
router.put('/:id', authMiddleware_1.authMiddleware, (req, res) => ProjectController_1.default.updateProject(req, res));
router.delete('/:id', authMiddleware_1.authMiddleware, authMiddleware_1.adminMiddleware, (req, res) => ProjectController_1.default.deleteProject(req, res));
exports.default = router;
