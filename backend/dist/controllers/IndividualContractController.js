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
const IndividualContract_1 = __importDefault(require("../models/IndividualContract"));
const Member_1 = __importDefault(require("../models/Member"));
const Project_1 = __importDefault(require("../models/Project"));
// 個別契約コントローラー
class IndividualContractController {
    // 個別契約一覧取得
    getAllContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contracts = yield IndividualContract_1.default.findAll({
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: Project_1.default, attributes: ['id', 'name', 'status'] }
                    ]
                });
                return res.status(200).json({
                    success: true,
                    data: contracts
                });
            }
            catch (error) {
                console.error('Get all individual contracts error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 要員別の個別契約一覧取得
    getContractsByMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { memberId } = req.params;
                const contracts = yield IndividualContract_1.default.findAll({
                    where: { memberId },
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: Project_1.default, attributes: ['id', 'name', 'status'] }
                    ]
                });
                return res.status(200).json({
                    success: true,
                    data: contracts
                });
            }
            catch (error) {
                console.error('Get contracts by member error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 案件別の個別契約一覧取得
    getContractsByProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { projectId } = req.params;
                const contracts = yield IndividualContract_1.default.findAll({
                    where: { projectId },
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position'] },
                        { model: Project_1.default, attributes: ['id', 'name', 'status'] }
                    ]
                });
                return res.status(200).json({
                    success: true,
                    data: contracts
                });
            }
            catch (error) {
                console.error('Get contracts by project error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 個別契約詳細取得
    getContractById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contract = yield IndividualContract_1.default.findByPk(id, {
                    include: [
                        { model: Member_1.default, attributes: ['id', 'name', 'position', 'email', 'phone'] },
                        { model: Project_1.default, attributes: ['id', 'name', 'status', 'description', 'startDate', 'endDate'] }
                    ]
                });
                if (!contract) {
                    return res.status(404).json({
                        success: false,
                        message: '個別契約が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: contract
                });
            }
            catch (error) {
                console.error('Get individual contract by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 個別契約新規作成
    createContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractData = req.body;
                // 要員の存在確認
                const member = yield Member_1.default.findByPk(contractData.memberId);
                if (!member) {
                    return res.status(404).json({
                        success: false,
                        message: '要員が見つかりません'
                    });
                }
                // 案件の存在確認
                const project = yield Project_1.default.findByPk(contractData.projectId);
                if (!project) {
                    return res.status(404).json({
                        success: false,
                        message: '案件が見つかりません'
                    });
                }
                const newContract = yield IndividualContract_1.default.create(contractData);
                return res.status(201).json({
                    success: true,
                    message: '個別契約を登録しました',
                    data: newContract
                });
            }
            catch (error) {
                console.error('Create individual contract error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 個別契約更新
    updateContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contractData = req.body;
                const contract = yield IndividualContract_1.default.findByPk(id);
                if (!contract) {
                    return res.status(404).json({
                        success: false,
                        message: '個別契約が見つかりません'
                    });
                }
                // 要員IDが変更される場合は存在確認
                if (contractData.memberId && contractData.memberId !== contract.memberId) {
                    const member = yield Member_1.default.findByPk(contractData.memberId);
                    if (!member) {
                        return res.status(404).json({
                            success: false,
                            message: '要員が見つかりません'
                        });
                    }
                }
                // 案件IDが変更される場合は存在確認
                if (contractData.projectId && contractData.projectId !== contract.projectId) {
                    const project = yield Project_1.default.findByPk(contractData.projectId);
                    if (!project) {
                        return res.status(404).json({
                            success: false,
                            message: '案件が見つかりません'
                        });
                    }
                }
                yield contract.update(contractData);
                return res.status(200).json({
                    success: true,
                    message: '個別契約情報を更新しました',
                    data: contract
                });
            }
            catch (error) {
                console.error('Update individual contract error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 個別契約削除
    deleteContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contract = yield IndividualContract_1.default.findByPk(id);
                if (!contract) {
                    return res.status(404).json({
                        success: false,
                        message: '個別契約が見つかりません'
                    });
                }
                yield contract.destroy();
                return res.status(200).json({
                    success: true,
                    message: '個別契約を削除しました'
                });
            }
            catch (error) {
                console.error('Delete individual contract error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new IndividualContractController();
