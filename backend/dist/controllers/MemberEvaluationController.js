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
const MemberEvaluation_1 = __importDefault(require("../models/MemberEvaluation"));
const Member_1 = __importDefault(require("../models/Member"));
const User_1 = __importDefault(require("../models/User"));
// 要員評価コントローラー
class MemberEvaluationController {
    // 要員評価一覧取得
    getAllEvaluations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const evaluations = yield MemberEvaluation_1.default.findAll({
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: User_1.default, attributes: ['id', 'name', 'email'] }
                    ],
                    order: [['evaluationDate', 'DESC']]
                });
                return res.status(200).json({
                    success: true,
                    data: evaluations
                });
            }
            catch (error) {
                console.error('Get all evaluations error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員別の評価一覧取得
    getEvaluationsByMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { memberId } = req.params;
                const evaluations = yield MemberEvaluation_1.default.findAll({
                    where: { memberId },
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: User_1.default, attributes: ['id', 'name', 'email'] }
                    ],
                    order: [['evaluationDate', 'DESC']]
                });
                return res.status(200).json({
                    success: true,
                    data: evaluations
                });
            }
            catch (error) {
                console.error('Get evaluations by member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 評価者別の評価一覧取得
    getEvaluationsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const evaluations = yield MemberEvaluation_1.default.findAll({
                    where: { userId },
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: User_1.default, attributes: ['id', 'name', 'email'] }
                    ],
                    order: [['evaluationDate', 'DESC']]
                });
                return res.status(200).json({
                    success: true,
                    data: evaluations
                });
            }
            catch (error) {
                console.error('Get evaluations by user error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員評価詳細取得
    getEvaluationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const evaluation = yield MemberEvaluation_1.default.findByPk(id, {
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position', 'email', 'phone'] },
                        { model: User_1.default, attributes: ['id', 'name', 'email'] }
                    ]
                });
                if (!evaluation) {
                    return res.status(404).json({
                        success: false,
                        message: '評価が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: evaluation
                });
            }
            catch (error) {
                console.error('Get evaluation by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員評価新規作成
    createEvaluation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const evaluationData = req.body;
                // 要員の存在確認
                const member = yield Member_1.default.findByPk(evaluationData.memberId);
                if (!member) {
                    return res.status(404).json({
                        success: false,
                        message: '要員が見つかりません'
                    });
                }
                // ユーザーの存在確認
                const user = yield User_1.default.findByPk(evaluationData.userId);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'ユーザーが見つかりません'
                    });
                }
                const newEvaluation = yield MemberEvaluation_1.default.create(evaluationData);
                return res.status(201).json({
                    success: true,
                    message: '評価を登録しました',
                    data: newEvaluation
                });
            }
            catch (error) {
                console.error('Create evaluation error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員評価更新
    updateEvaluation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const evaluationData = req.body;
                const evaluation = yield MemberEvaluation_1.default.findByPk(id);
                if (!evaluation) {
                    return res.status(404).json({
                        success: false,
                        message: '評価が見つかりません'
                    });
                }
                yield evaluation.update(evaluationData);
                return res.status(200).json({
                    success: true,
                    message: '評価情報を更新しました',
                    data: evaluation
                });
            }
            catch (error) {
                console.error('Update evaluation error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員評価削除
    deleteEvaluation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const evaluation = yield MemberEvaluation_1.default.findByPk(id);
                if (!evaluation) {
                    return res.status(404).json({
                        success: false,
                        message: '評価が見つかりません'
                    });
                }
                yield evaluation.destroy();
                return res.status(200).json({
                    success: true,
                    message: '評価を削除しました'
                });
            }
            catch (error) {
                console.error('Delete evaluation error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new MemberEvaluationController();
