"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const router = express_1.default.Router();
// ユーザー一覧取得
router.get('/', (req, res, next) => {
    UserController_1.default.getAllUsers(req, res);
});
// 特定ユーザー取得
router.get('/:id', (req, res, next) => {
    UserController_1.default.getUserById(req, res);
});
// ユーザー作成
router.post('/', (req, res, next) => {
    UserController_1.default.createUser(req, res);
});
// ユーザー更新
router.put('/:id', (req, res, next) => {
    UserController_1.default.updateUser(req, res);
});
// ユーザー削除
router.delete('/:id', (req, res, next) => {
    UserController_1.default.deleteUser(req, res);
});
exports.default = router;
