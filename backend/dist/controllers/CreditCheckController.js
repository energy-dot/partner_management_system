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
// 信用調査/反社チェックコントローラー
class CreditCheckController {
    // 信用調査実施
    performCreditCheck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { checkDate, remarks } = req.body;
                const partner = yield Partner_1.default.findByPk(id);
                if (!partner) {
                    return res.status(404).json({
                        success: false,
                        message: 'パートナー会社が見つかりません'
                    });
                }
                yield partner.update({
                    creditCheckDate: checkDate || new Date(),
                    remarks: remarks ? `${partner.remarks || ''}\n【信用調査】${remarks}` : partner.remarks
                });
                return res.status(200).json({
                    success: true,
                    message: '信用調査情報を更新しました',
                    data: partner
                });
            }
            catch (error) {
                console.error('Credit check error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 反社チェック実施
    performAntiSocialCheck(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { checkDate, remarks } = req.body;
                const partner = yield Partner_1.default.findByPk(id);
                if (!partner) {
                    return res.status(404).json({
                        success: false,
                        message: 'パートナー会社が見つかりません'
                    });
                }
                yield partner.update({
                    antiSocialCheckDate: checkDate || new Date(),
                    remarks: remarks ? `${partner.remarks || ''}\n【反社チェック】${remarks}` : partner.remarks
                });
                return res.status(200).json({
                    success: true,
                    message: '反社チェック情報を更新しました',
                    data: partner
                });
            }
            catch (error) {
                console.error('Anti-social check error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // 信用調査/反社チェック履歴取得
    getCheckHistory(req, res) {
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
                const checkHistory = {
                    partnerId: partner.id,
                    partnerName: partner.name,
                    creditCheckDate: partner.creditCheckDate,
                    antiSocialCheckDate: partner.antiSocialCheckDate,
                    remarks: partner.remarks
                };
                return res.status(200).json({
                    success: true,
                    data: checkHistory
                });
            }
            catch (error) {
                console.error('Get check history error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new CreditCheckController();
