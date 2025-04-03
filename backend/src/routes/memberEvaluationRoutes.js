"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MemberEvaluationController_1 = __importDefault(require("../controllers/MemberEvaluationController"));
const router = express_1.default.Router();
// 要員評価一覧取得
router.get('/', (req, res, next) => {
    MemberEvaluationController_1.default.getAllMemberEvaluations(req, res);
});
// 特定の要員評価取得
router.get('/:id', (req, res, next) => {
    MemberEvaluationController_1.default.getMemberEvaluationById(req, res);
});
// 要員評価作成
router.post('/', (req, res, next) => {
    MemberEvaluationController_1.default.createMemberEvaluation(req, res);
});
// 要員評価更新
router.put('/:id', (req, res, next) => {
    MemberEvaluationController_1.default.updateMemberEvaluation(req, res);
});
// 要員評価削除
router.delete('/:id', (req, res, next) => {
    MemberEvaluationController_1.default.deleteMemberEvaluation(req, res);
});
exports.default = router;
