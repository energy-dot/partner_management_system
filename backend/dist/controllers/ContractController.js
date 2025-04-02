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
const Contract_1 = __importDefault(require("../models/Contract"));
const Partner_1 = __importDefault(require("../models/Partner"));
// 基本契約コントローラー
class ContractController {
    // 基本契約一覧取得
    getAllContracts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contracts = yield Contract_1.default.findAll({
                    include: [{ model: Partner_1.default, attributes: ['id', 'name'] }]
                });
                return res.status(200).json({
                    success: true,
                    data: contracts
                });
            }
            catch (error) {
                console.error('Get all contracts error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // パートナー会社別の契約一覧取得
    getContractsByPartner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { partnerId } = req.params;
                const contracts = yield Contract_1.default.findAll({
                    where: { partnerId },
                    include: [{ model: Partner_1.default, attributes: ['id', 'name'] }]
                });
                return res.status(200).json({
                    success: true,
                    data: contracts
                });
            }
            catch (error) {
                console.error('Get contracts by partner error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 基本契約詳細取得
    getContractById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contract = yield Contract_1.default.findByPk(id, {
                    include: [{ model: Partner_1.default, attributes: ['id', 'name'] }]
                });
                if (!contract) {
                    return res.status(404).json({
                        success: false,
                        message: '契約が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: contract
                });
            }
            catch (error) {
                console.error('Get contract by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 基本契約新規作成
    createContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contractData = req.body;
                // パートナー会社の存在確認
                const partner = yield Partner_1.default.findByPk(contractData.partnerId);
                if (!partner) {
                    return res.status(404).json({
                        success: false,
                        message: 'パートナー会社が見つかりません'
                    });
                }
                const newContract = yield Contract_1.default.create(contractData);
                return res.status(201).json({
                    success: true,
                    message: '契約を登録しました',
                    data: newContract
                });
            }
            catch (error) {
                console.error('Create contract error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 基本契約更新
    updateContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contractData = req.body;
                const contract = yield Contract_1.default.findByPk(id);
                if (!contract) {
                    return res.status(404).json({
                        success: false,
                        message: '契約が見つかりません'
                    });
                }
                // パートナー会社IDが変更される場合は存在確認
                if (contractData.partnerId && contractData.partnerId !== contract.partnerId) {
                    const partner = yield Partner_1.default.findByPk(contractData.partnerId);
                    if (!partner) {
                        return res.status(404).json({
                            success: false,
                            message: 'パートナー会社が見つかりません'
                        });
                    }
                }
                yield contract.update(contractData);
                return res.status(200).json({
                    success: true,
                    message: '契約情報を更新しました',
                    data: contract
                });
            }
            catch (error) {
                console.error('Update contract error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 基本契約削除
    deleteContract(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const contract = yield Contract_1.default.findByPk(id);
                if (!contract) {
                    return res.status(404).json({
                        success: false,
                        message: '契約が見つかりません'
                    });
                }
                yield contract.destroy();
                return res.status(200).json({
                    success: true,
                    message: '契約を削除しました'
                });
            }
            catch (error) {
                console.error('Delete contract error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new ContractController();
