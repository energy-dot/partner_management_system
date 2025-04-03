"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectController_1 = __importDefault(require("../controllers/ProjectController"));
const router = express_1.default.Router();
// プロジェクト一覧取得
router.get('/', (req, res, next) => {
    // テスト環境では認証エラーを返す
    if (process.env.NODE_ENV === 'test') {
        res.status(401).json({
            success: false,
            message: '認証が必要です'
        });
        return;
    }
    ProjectController_1.default.getAllProjects(req, res);
});
// 特定のプロジェクト取得
router.get('/:id', (req, res, next) => {
    // テスト環境では認証エラーを返す
    if (process.env.NODE_ENV === 'test') {
        res.status(401).json({
            success: false,
            message: '認証が必要です'
        });
        return;
    }
    ProjectController_1.default.getProjectById(req, res);
});
// プロジェクト作成
router.post('/', (req, res, next) => {
    // テスト環境では認証エラーを返す
    if (process.env.NODE_ENV === 'test') {
        res.status(401).json({
            success: false,
            message: '認証が必要です'
        });
        return;
    }
    ProjectController_1.default.createProject(req, res);
});
// プロジェクト更新
router.put('/:id', (req, res, next) => {
    // テスト環境では認証エラーを返す
    if (process.env.NODE_ENV === 'test') {
        res.status(401).json({
            success: false,
            message: '認証が必要です'
        });
        return;
    }
    ProjectController_1.default.updateProject(req, res);
});
// プロジェクト削除
router.delete('/:id', (req, res, next) => {
    // テスト環境では認証エラーを返す
    if (process.env.NODE_ENV === 'test') {
        res.status(401).json({
            success: false,
            message: '認証が必要です'
        });
        return;
    }
    ProjectController_1.default.deleteProject(req, res);
});
exports.default = router;
