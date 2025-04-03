"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const router = express_1.default.Router();
// ログイン
router.post('/login', (req, res, next) => {
    AuthController_1.default.login(req, res);
});
// ログアウト
router.post('/logout', (req, res, next) => {
    AuthController_1.default.logout(req, res);
});
exports.default = router;
