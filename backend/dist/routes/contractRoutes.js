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
const ContractController_1 = __importDefault(require("../controllers/ContractController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// 基本契約ルート
router.get('/', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ContractController_1.default.getAllContracts(req, res);
})));
router.get('/partner/:partnerId', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ContractController_1.default.getContractsByPartner(req, res);
})));
router.get('/:id', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ContractController_1.default.getContractById(req, res);
})));
router.post('/', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ContractController_1.default.createContract(req, res);
})));
router.put('/:id', authMiddleware_1.authMiddleware, ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ContractController_1.default.updateContract(req, res);
})));
router.delete('/:id', [authMiddleware_1.authMiddleware, ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, authMiddleware_1.adminMiddleware)(req, res, next);
    }))], ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield ContractController_1.default.deleteContract(req, res);
})));
exports.default = router;
