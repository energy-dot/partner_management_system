"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// 認証ルート
router.post('/login', (req, res) => AuthController_1.default.login(req, res));
router.get('/profile', authMiddleware_1.authMiddleware, (req, res) => AuthController_1.default.getProfile(req, res));
exports.default = router;
