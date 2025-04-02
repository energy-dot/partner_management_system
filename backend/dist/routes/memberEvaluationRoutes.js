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
const express_1 = require("express");
const MemberEvaluationController_1 = __importDefault(require("../controllers/MemberEvaluationController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// 要員評価ルート
router.get('/', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MemberEvaluationController_1.default.getAllEvaluations(req, res);
})));
router.get('/member/:memberId', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MemberEvaluationController_1.default.getEvaluationsByMember(req, res);
})));
router.get('/user/:userId', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MemberEvaluationController_1.default.getEvaluationsByUser(req, res);
})));
router.get('/:id', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MemberEvaluationController_1.default.getEvaluationById(req, res);
})));
router.post('/', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MemberEvaluationController_1.default.createEvaluation(req, res);
})));
router.put('/:id', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MemberEvaluationController_1.default.updateEvaluation(req, res);
})));
router.delete('/:id', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield MemberEvaluationController_1.default.deleteEvaluation(req, res);
})));
exports.default = router;
