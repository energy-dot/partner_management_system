"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CreditCheckController_1 = __importDefault(require("../controllers/CreditCheckController"));
const router = express_1.default.Router();
// 信用調査/反社チェック一覧取得
router.get('/', (req, res, next) => {
    CreditCheckController_1.default.getAllCreditChecks(req, res);
});
// 特定の信用調査/反社チェック取得
router.get('/:id', (req, res, next) => {
    CreditCheckController_1.default.getCreditCheckById(req, res);
});
// 信用調査/反社チェック作成
router.post('/', (req, res, next) => {
    CreditCheckController_1.default.createCreditCheck(req, res);
});
// 信用調査/反社チェック更新
router.put('/:id', (req, res, next) => {
    CreditCheckController_1.default.updateCreditCheck(req, res);
});
// 信用調査/反社チェック削除
router.delete('/:id', (req, res, next) => {
    CreditCheckController_1.default.deleteCreditCheck(req, res);
});
exports.default = router;
