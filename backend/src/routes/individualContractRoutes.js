"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IndividualContractController_1 = __importDefault(require("../controllers/IndividualContractController"));
const router = express_1.default.Router();
// 個別契約一覧取得
router.get('/', (req, res, next) => {
    IndividualContractController_1.default.getAllIndividualContracts(req, res);
});
// 特定の個別契約取得
router.get('/:id', (req, res, next) => {
    IndividualContractController_1.default.getIndividualContractById(req, res);
});
// 個別契約作成
router.post('/', (req, res, next) => {
    IndividualContractController_1.default.createIndividualContract(req, res);
});
// 個別契約更新
router.put('/:id', (req, res, next) => {
    IndividualContractController_1.default.updateIndividualContract(req, res);
});
// 個別契約削除
router.delete('/:id', (req, res, next) => {
    IndividualContractController_1.default.deleteIndividualContract(req, res);
});
exports.default = router;
