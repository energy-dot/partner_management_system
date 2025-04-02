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
const Member_1 = __importDefault(require("../models/Member"));
const Partner_1 = __importDefault(require("../models/Partner"));
const Project_1 = __importDefault(require("../models/Project"));
// 要員コントローラー
class MemberController {
    // 要員一覧取得
    getAllMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const members = yield Member_1.default.findAll({
                    include: [
                        { model: Partner_1.default, attributes: ['name'] },
                        { model: Project_1.default, attributes: ['name'] }
                    ]
                });
                return res.status(200).json({
                    success: true,
                    data: members
                });
            }
            catch (error) {
                console.error('Get all members error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員詳細取得
    getMemberById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const member = yield Member_1.default.findByPk(id, {
                    include: [
                        { model: Partner_1.default, attributes: ['id', 'name'] },
                        { model: Project_1.default, attributes: ['id', 'name'] }
                    ]
                });
                if (!member) {
                    return res.status(404).json({
                        success: false,
                        message: '要員が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: member
                });
            }
            catch (error) {
                console.error('Get member by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員新規作成
    createMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const memberData = req.body;
                // パートナー会社の存在確認
                const partner = yield Partner_1.default.findByPk(memberData.partnerId);
                if (!partner) {
                    return res.status(400).json({
                        success: false,
                        message: '指定されたパートナー会社が存在しません'
                    });
                }
                // プロジェクトの存在確認（指定されている場合）
                if (memberData.projectId) {
                    const project = yield Project_1.default.findByPk(memberData.projectId);
                    if (!project) {
                        return res.status(400).json({
                            success: false,
                            message: '指定された案件が存在しません'
                        });
                    }
                }
                const newMember = yield Member_1.default.create(memberData);
                return res.status(201).json({
                    success: true,
                    message: '要員を登録しました',
                    data: newMember
                });
            }
            catch (error) {
                console.error('Create member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員更新
    updateMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const memberData = req.body;
                const member = yield Member_1.default.findByPk(id);
                if (!member) {
                    return res.status(404).json({
                        success: false,
                        message: '要員が見つかりません'
                    });
                }
                // パートナー会社の存在確認（変更されている場合）
                if (memberData.partnerId && memberData.partnerId !== member.partnerId) {
                    const partner = yield Partner_1.default.findByPk(memberData.partnerId);
                    if (!partner) {
                        return res.status(400).json({
                            success: false,
                            message: '指定されたパートナー会社が存在しません'
                        });
                    }
                }
                // プロジェクトの存在確認（指定されている場合）
                if (memberData.projectId && memberData.projectId !== member.projectId) {
                    const project = yield Project_1.default.findByPk(memberData.projectId);
                    if (!project) {
                        return res.status(400).json({
                            success: false,
                            message: '指定された案件が存在しません'
                        });
                    }
                }
                yield member.update(memberData);
                return res.status(200).json({
                    success: true,
                    message: '要員情報を更新しました',
                    data: member
                });
            }
            catch (error) {
                console.error('Update member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員削除
    deleteMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const member = yield Member_1.default.findByPk(id);
                if (!member) {
                    return res.status(404).json({
                        success: false,
                        message: '要員が見つかりません'
                    });
                }
                yield member.destroy();
                return res.status(200).json({
                    success: true,
                    message: '要員を削除しました'
                });
            }
            catch (error) {
                console.error('Delete member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new MemberController();
