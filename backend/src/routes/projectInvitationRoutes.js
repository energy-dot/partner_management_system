"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectInvitationController_1 = __importDefault(require("../controllers/ProjectInvitationController"));
const router = express_1.default.Router();
// 案件募集一覧取得
router.get('/', (req, res, next) => {
    ProjectInvitationController_1.default.getAllProjectInvitations(req, res);
});
// 特定の案件募集取得
router.get('/:id', (req, res, next) => {
    ProjectInvitationController_1.default.getProjectInvitationById(req, res);
});
// 案件募集作成
router.post('/', (req, res, next) => {
    ProjectInvitationController_1.default.createProjectInvitation(req, res);
});
// 案件募集更新
router.put('/:id', (req, res, next) => {
    ProjectInvitationController_1.default.updateProjectInvitation(req, res);
});
// 案件募集削除
router.delete('/:id', (req, res, next) => {
    ProjectInvitationController_1.default.deleteProjectInvitation(req, res);
});
exports.default = router;
