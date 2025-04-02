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
const Partner_1 = __importDefault(require("../models/Partner"));
// パートナー会社コントローラー
class PartnerController {
    // パートナー会社一覧取得
    getAllPartners(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partners = yield Partner_1.default.findAll();
                return res.status(200).json({
                    success: true,
                    data: partners
                });
            }
            catch (error) {
                console.error('Get all partners error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // パートナー会社詳細取得
    getPartnerById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const partner = yield Partner_1.default.findByPk(id);
                if (!partner) {
                    return res.status(404).json({
                        success: false,
                        message: 'パートナー会社が見つかりません'
                    });
                }
                return res.status(200).json({
                    success: true,
                    data: partner
                });
            }
            catch (error) {
                console.error('Get partner by id error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // パートナー会社新規作成
    createPartner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const partnerData = req.body;
                const newPartner = yield Partner_1.default.create(partnerData);
                return res.status(201).json({
                    success: true,
                    message: 'パートナー会社を登録しました',
                    data: newPartner
                });
            }
            catch (error) {
                console.error('Create partner error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // パートナー会社更新
    updatePartner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const partnerData = req.body;
                const partner = yield Partner_1.default.findByPk(id);
                if (!partner) {
                    return res.status(404).json({
                        success: false,
                        message: 'パートナー会社が見つかりません'
                    });
                }
                yield partner.update(partnerData);
                return res.status(200).json({
                    success: true,
                    message: 'パートナー会社情報を更新しました',
                    data: partner
                });
            }
            catch (error) {
                console.error('Update partner error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // パートナー会社削除
    deletePartner(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const partner = yield Partner_1.default.findByPk(id);
                if (!partner) {
                    return res.status(404).json({
                        success: false,
                        message: 'パートナー会社が見つかりません'
                    });
                }
                yield partner.destroy();
                return res.status(200).json({
                    success: true,
                    message: 'パートナー会社を削除しました'
                });
            }
            catch (error) {
                console.error('Delete partner error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new PartnerController();
