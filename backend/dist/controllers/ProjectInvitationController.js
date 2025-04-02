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
const ProjectInvitation_1 = __importDefault(require("../models/ProjectInvitation"));
const Project_1 = __importDefault(require("../models/Project"));
const Partner_1 = __importDefault(require("../models/Partner"));
// 案件募集送信コントローラー
class ProjectInvitationController {
    // 案件募集一覧取得
    getAllInvitations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invitations = yield ProjectInvitation_1.default.findAll({
                    include: [
                        { model: Project_1.default, attributes: ['id', 'name', 'status'] },
                        { model: Partner_1.default, attributes: ['id', 'name'] }
                    ]
                });
                return res.status(200).json({
                    success: true,
                    data: invitations
                });
            }
            catch (error) {
                console.error('Get all invitations error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件別の募集一覧取得
    getInvitationsByProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const invitations = yield ProjectInvitation_1.default.findAll({
                    where: { projectId },
                    include: [
                        { model: Project_1.default, attributes: ['id', 'name', 'status'] },
                        { model: Partner_1.default, attributes: ['id', 'name'] }
                    ]
                });
                return res.status(200).json({
                    success: true,
                    data: invitations
                });
            }
            catch (error) {
                console.error('Get invitations by project error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // パートナー会社別の募集一覧取得
    getInvitationsByPartner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { partnerId } = req.params;
                const invitations = yield ProjectInvitation_1.default.findAll({
                    where: { partnerId },
                    include: [
                        { model: Project_1.default, attributes: ['id', 'name', 'status'] },
                        { model: Partner_1.default, attributes: ['id', 'name'] }
                    ]
                });
                return res.status(200).json({
                    success: true,
                    data: invitations
                });
            }
            catch (error) {
                console.error('Get invitations by partner error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件募集詳細取得
    getInvitationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const invitation = yield ProjectInvitation_1.default.findByPk(id, {
                    include: [
                        { model: Project_1.default, attributes: ['id', 'name', 'status', 'description', 'startDate', 'endDate'] },
                        { model: Partner_1.default, attributes: ['id', 'name', 'status'] }
                    ]
                });
                if (!invitation) {
                    return res.status(404).json({
                        success: false,
                        message: '案件募集が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: invitation
                });
            }
            catch (error) {
                console.error('Get invitation by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件募集送信
    createInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const invitationData = req.body;
                // 案件の存在確認
                const project = yield Project_1.default.findByPk(invitationData.projectId);
                if (!project) {
                    return res.status(404).json({
                        success: false,
                        message: '案件が見つかりません'
                    });
                }
                // パートナー会社の存在確認
                const partner = yield Partner_1.default.findByPk(invitationData.partnerId);
                if (!partner) {
                    return res.status(404).json({
                        success: false,
                        message: 'パートナー会社が見つかりません'
                    });
                }
                const newInvitation = yield ProjectInvitation_1.default.create(invitationData);
                return res.status(201).json({
                    success: true,
                    message: '案件募集を送信しました',
                    data: newInvitation
                });
            }
            catch (error) {
                console.error('Create invitation error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 複数パートナーへの一括送信
    createBulkInvitations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId, partnerIds, responseDeadline, remarks } = req.body;
                // 案件の存在確認
                const project = yield Project_1.default.findByPk(projectId);
                if (!project) {
                    return res.status(404).json({
                        success: false,
                        message: '案件が見つかりません'
                    });
                }
                // パートナー会社の存在確認
                const partners = yield Partner_1.default.findAll({
                    where: {
                        id: partnerIds
                    }
                });
                if (partners.length !== partnerIds.length) {
                    return res.status(404).json({
                        success: false,
                        message: '一部のパートナー会社が見つかりません'
                    });
                }
                // 一括作成用のデータ準備
                const invitationsData = partnerIds.map((partnerId) => ({
                    projectId,
                    partnerId,
                    sentDate: new Date(),
                    responseDeadline,
                    status: '送信済',
                    remarks
                }));
                const newInvitations = yield ProjectInvitation_1.default.bulkCreate(invitationsData);
                return res.status(201).json({
                    success: true,
                    message: `${newInvitations.length}社のパートナー会社に案件募集を送信しました`,
                    data: newInvitations
                });
            }
            catch (error) {
                console.error('Create bulk invitations error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件募集更新
    updateInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const invitationData = req.body;
                const invitation = yield ProjectInvitation_1.default.findByPk(id);
                if (!invitation) {
                    return res.status(404).json({
                        success: false,
                        message: '案件募集が見つかりません'
                    });
                }
                yield invitation.update(invitationData);
                return res.status(200).json({
                    success: true,
                    message: '案件募集情報を更新しました',
                    data: invitation
                });
            }
            catch (error) {
                console.error('Update invitation error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件募集キャンセル
    cancelInvitation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { remarks } = req.body;
                const invitation = yield ProjectInvitation_1.default.findByPk(id);
                if (!invitation) {
                    return res.status(404).json({
                        success: false,
                        message: '案件募集が見つかりません'
                    });
                }
                yield invitation.update({
                    status: 'キャンセル',
                    remarks: remarks ? `${invitation.remarks || ''}\n【キャンセル理由】${remarks}` : invitation.remarks
                });
                return res.status(200).json({
                    success: true,
                    message: '案件募集をキャンセルしました',
                    data: invitation
                });
            }
            catch (error) {
                console.error('Cancel invitation error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new ProjectInvitationController();
