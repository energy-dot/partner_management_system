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
const MemberCommunication_1 = __importDefault(require("../models/MemberCommunication"));
const Member_1 = __importDefault(require("../models/Member"));
const User_1 = __importDefault(require("../models/User"));
// 要員連絡・依頼コントローラー
class MemberCommunicationController {
    // 要員連絡・依頼一覧取得
    getAllCommunications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const communications = yield MemberCommunication_1.default.findAll({
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: User_1.default, attributes: ['id', 'name', 'email'] }
                    ],
                    order: [['createdAt', 'DESC']]
                });
                return res.status(200).json({
                    success: true,
                    data: communications
                });
            }
            catch (error) {
                console.error('Get all communications error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員別の連絡・依頼一覧取得
    getCommunicationsByMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { memberId } = req.params;
                const communications = yield MemberCommunication_1.default.findAll({
                    where: { memberId },
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: User_1.default, attributes: ['id', 'name', 'email'] }
                    ],
                    order: [['createdAt', 'DESC']]
                });
                return res.status(200).json({
                    success: true,
                    data: communications
                });
            }
            catch (error) {
                console.error('Get communications by member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // ユーザー別の連絡・依頼一覧取得
    getCommunicationsByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const communications = yield MemberCommunication_1.default.findAll({
                    where: { userId },
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: User_1.default, attributes: ['id', 'name', 'email'] }
                    ],
                    order: [['createdAt', 'DESC']]
                });
                return res.status(200).json({
                    success: true,
                    data: communications
                });
            }
            catch (error) {
                console.error('Get communications by user error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員連絡・依頼詳細取得
    getCommunicationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const communication = yield MemberCommunication_1.default.findByPk(id, {
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position', 'email', 'phone'] },
                        { model: User_1.default, attributes: ['id', 'name', 'email'] }
                    ]
                });
                if (!communication) {
                    return res.status(404).json({
                        success: false,
                        message: '連絡・依頼が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: communication
                });
            }
            catch (error) {
                console.error('Get communication by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員連絡・依頼新規作成
    createCommunication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const communicationData = req.body;
                // 要員の存在確認
                const member = yield Member_1.default.findByPk(communicationData.memberId);
                if (!member) {
                    return res.status(404).json({
                        success: false,
                        message: '要員が見つかりません'
                    });
                }
                // ユーザーの存在確認
                const user = yield User_1.default.findByPk(communicationData.userId);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'ユーザーが見つかりません'
                    });
                }
                const newCommunication = yield MemberCommunication_1.default.create(communicationData);
                return res.status(201).json({
                    success: true,
                    message: '連絡・依頼を登録しました',
                    data: newCommunication
                });
            }
            catch (error) {
                console.error('Create communication error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員連絡・依頼更新
    updateCommunication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const communicationData = req.body;
                const communication = yield MemberCommunication_1.default.findByPk(id);
                if (!communication) {
                    return res.status(404).json({
                        success: false,
                        message: '連絡・依頼が見つかりません'
                    });
                }
                // ステータスが完了に変更される場合は完了日を設定
                if (communicationData.status === '完了' && communication.status !== '完了') {
                    communicationData.completedDate = new Date();
                }
                yield communication.update(communicationData);
                return res.status(200).json({
                    success: true,
                    message: '連絡・依頼情報を更新しました',
                    data: communication
                });
            }
            catch (error) {
                console.error('Update communication error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員連絡・依頼削除
    deleteCommunication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const communication = yield MemberCommunication_1.default.findByPk(id);
                if (!communication) {
                    return res.status(404).json({
                        success: false,
                        message: '連絡・依頼が見つかりません'
                    });
                }
                yield communication.destroy();
                return res.status(200).json({
                    success: true,
                    message: '連絡・依頼を削除しました'
                });
            }
            catch (error) {
                console.error('Delete communication error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new MemberCommunicationController();
