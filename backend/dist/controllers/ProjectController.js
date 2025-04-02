"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../models/Project"));
// 案件コントローラー
class ProjectController {
    // 案件一覧取得
    getAllProjects(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield Project_1.default.findAll();
                return res.status(200).json({
                    success: true,
                    data: projects
                });
            }
            catch (error) {
                console.error('Get all projects error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件詳細取得
    getProjectById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield Project_1.default.findByPk(id);
                if (!project) {
                    return res.status(404).json({
                        success: false,
                        message: '案件が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: project
                });
            }
            catch (error) {
                console.error('Get project by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件新規作成
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectData = req.body;
                const newProject = yield Project_1.default.create(projectData);
                return res.status(201).json({
                    success: true,
                    message: '案件を登録しました',
                    data: newProject
                });
            }
            catch (error) {
                console.error('Create project error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件更新
    updateProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const projectData = req.body;
                const project = yield Project_1.default.findByPk(id);
                if (!project) {
                    return res.status(404).json({
                        success: false,
                        message: '案件が見つかりません'
                    });
                }
                yield project.update(projectData);
                return res.status(200).json({
                    success: true,
                    message: '案件情報を更新しました',
                    data: project
                });
            }
            catch (error) {
                console.error('Update project error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件削除
    deleteProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield Project_1.default.findByPk(id);
                if (!project) {
                    return res.status(404).json({
                        success: false,
                        message: '案件が見つかりません'
                    });
                }
                yield project.destroy();
                return res.status(200).json({
                    success: true,
                    message: '案件を削除しました'
                });
            }
            catch (error) {
                console.error('Delete project error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new ProjectController();
