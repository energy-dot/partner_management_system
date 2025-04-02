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
const express_1 = require("express");
const CreditCheckController_1 = __importDefault(require("../controllers/CreditCheckController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// 信用調査/反社チェックルート
router.post('/:id/credit-check', [authMiddleware_1.authMiddleware, ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, authMiddleware_1.adminMiddleware)(req, res, next);
    }))], ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield CreditCheckController_1.default.performCreditCheck(req, res);
})));
router.post('/:id/anti-social-check', [authMiddleware_1.authMiddleware, ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, authMiddleware_1.adminMiddleware)(req, res, next);
    }))], ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield CreditCheckController_1.default.performAntiSocialCheck(req, res);
})));
router.get('/:id/check-history', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield CreditCheckController_1.default.getCheckHistory(req, res);
})));
exports.default = router;
