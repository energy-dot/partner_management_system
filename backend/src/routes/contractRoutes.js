"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ContractController_1 = __importDefault(require("../controllers/ContractController"));
const router = express_1.default.Router();
// 契約一覧取得
router.get('/', (req, res, next) => {
    ContractController_1.default.getAllContracts(req, res);
});
// 特定の契約取得
router.get('/:id', (req, res, next) => {
    ContractController_1.default.getContractById(req, res);
});
// 契約作成
router.post('/', (req, res, next) => {
    ContractController_1.default.createContract(req, res);
});
// 契約更新
router.put('/:id', (req, res, next) => {
    ContractController_1.default.updateContract(req, res);
});
// 契約削除
router.delete('/:id', (req, res, next) => {
    ContractController_1.default.deleteContract(req, res);
});
exports.default = router;
