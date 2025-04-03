"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const MemberCommunicationController_1 = __importDefault(require("../controllers/MemberCommunicationController"));
const router = express_1.default.Router();
// 要員関連連絡・依頼一覧取得
router.get('/', (req, res, next) => {
    MemberCommunicationController_1.default.getAllMemberCommunications(req, res);
});
// 特定の要員関連連絡・依頼取得
router.get('/:id', (req, res, next) => {
    MemberCommunicationController_1.default.getMemberCommunicationById(req, res);
});
// 要員関連連絡・依頼作成
router.post('/', (req, res, next) => {
    MemberCommunicationController_1.default.createMemberCommunication(req, res);
});
// 要員関連連絡・依頼更新
router.put('/:id', (req, res, next) => {
    MemberCommunicationController_1.default.updateMemberCommunication(req, res);
});
// 要員関連連絡・依頼削除
router.delete('/:id', (req, res, next) => {
    MemberCommunicationController_1.default.deleteMemberCommunication(req, res);
});
exports.default = router;
