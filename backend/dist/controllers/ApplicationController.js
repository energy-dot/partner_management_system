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
const Application_1 = __importDefault(require("../models/Application"));
const Partner_1 = __importDefault(require("../models/Partner"));
const Project_1 = __importDefault(require("../models/Project"));
const Member_1 = __importDefault(require("../models/Member"));
// 応募コントローラー
class ApplicationController {
    // 応募一覧取得
    getAllApplications(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applications = yield Application_1.default.findAll({
                    include: [
                        { model: Partner_1.default, attributes: ['name'] },
                        { model: Project_1.default, attributes: ['name'] }
                    ]
                });
                return res.status(200).json({
                    success: true,
                    data: applications
                });
            }
            catch (error) {
                console.error('Get all applications error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 応募詳細取得
    getApplicationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const application = yield Application_1.default.findByPk(id, {
                    include: [
                        { model: Partner_1.default, attributes: ['id', 'name'] },
                        { model: Project_1.default, attributes: ['id', 'name'] }
                    ]
                });
                if (!application) {
                    return res.status(404).json({
                        success: false,
                        message: '応募が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: application
                });
            }
            catch (error) {
                console.error('Get application by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 応募新規作成
    createApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const applicationData = req.body;
                // パートナー会社の存在確認
                const partner = yield Partner_1.default.findByPk(applicationData.partnerId);
                if (!partner) {
                    return res.status(400).json({
                        success: false,
                        message: '指定されたパートナー会社が存在しません'
                    });
                }
                // プロジェクトの存在確認
                const project = yield Project_1.default.findByPk(applicationData.projectId);
                if (!project) {
                    return res.status(400).json({
                        success: false,
                        message: '指定された案件が存在しません'
                    });
                }
                const newApplication = yield Application_1.default.create(applicationData);
                return res.status(201).json({
                    success: true,
                    message: '応募を登録しました',
                    data: newApplication
                });
            }
            catch (error) {
                console.error('Create application error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 応募更新
    updateApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const applicationData = req.body;
                const application = yield Application_1.default.findByPk(id);
                if (!application) {
                    return res.status(404).json({
                        success: false,
                        message: '応募が見つかりません'
                    });
                }
                yield application.update(applicationData);
                return res.status(200).json({
                    success: true,
                    message: '応募情報を更新しました',
                    data: application
                });
            }
            catch (error) {
                console.error('Update application error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 応募承認（要員として登録）
    approveApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const application = yield Application_1.default.findByPk(id, {
                    include: [
                        { model: Partner_1.default },
                        { model: Project_1.default }
                    ]
                });
                if (!application) {
                    return res.status(404).json({
                        success: false,
                        message: '応募が見つかりません'
                    });
                }
                if (application.status !== '審査中') {
                    return res.status(400).json({
                        success: false,
                        message: 'この応募は既に処理されています'
                    });
                }
                // 応募を承認済みに更新
                yield application.update({ status: '承認済' });
                // 要員として登録
                const newMember = yield Member_1.default.create({
                    name: application.applicantName,
                    partnerId: application.partnerId,
                    skills: application.skills,
                    projectId: application.projectId,
                    startDate: new Date(), // 開始日は現在日付
                    rate: application.rate,
                    status: '稼働中'
                });
                return res.status(200).json({
                    success: true,
                    message: '応募を承認し、要員として登録しました',
                    data: {
                        application,
                        member: newMember
                    }
                });
            }
            catch (error) {
                console.error('Approve application error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 応募却下
    rejectApplication(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { reason } = req.body;
                const application = yield Application_1.default.findByPk(id);
                if (!application) {
                    return res.status(404).json({
                        success: false,
                        message: '応募が見つかりません'
                    });
                }
                if (application.status !== '審査中') {
                    return res.status(400).json({
                        success: false,
                        message: 'この応募は既に処理されています'
                    });
                }
                // 応募を却下に更新
                yield application.update({
                    status: '却下',
                    remarks: reason || '要件に合致しないため'
                });
                return res.status(200).json({
                    success: true,
                    message: '応募を却下しました',
                    data: application
                });
            }
            catch (error) {
                console.error('Reject application error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new ApplicationController();
