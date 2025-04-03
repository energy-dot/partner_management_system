"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectManagerMiddleware = exports.partnerAdminMiddleware = exports.adminMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
// 認証ミドルウェア
const authMiddleware = (req, res, next) => {
    var _a;
    // テスト環境では認証をスキップ
    if (process.env.NODE_ENV === 'test') {
        return next();
    }
    // ヘッダーからトークンを取得
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            message: '認証トークンがありません'
        });
    }
    try {
        // トークンを検証
        const decoded = jsonwebtoken_1.default.verify(token, config_1.serverConfig.jwtSecret);
        // リクエストオブジェクトにユーザー情報を追加
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: '無効な認証トークンです'
        });
    }
};
exports.authMiddleware = authMiddleware;
// 管理者権限チェックミドルウェア
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: '管理者権限が必要です'
        });
    }
};
exports.adminMiddleware = adminMiddleware;
// パートナー管理者権限チェックミドルウェア
const partnerAdminMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'partner_admin')) {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: 'パートナー管理者権限が必要です'
        });
    }
};
exports.partnerAdminMiddleware = partnerAdminMiddleware;
// プロジェクト管理者権限チェックミドルウェア
const projectManagerMiddleware = (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.role === 'project_manager')) {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: 'プロジェクト管理者権限が必要です'
        });
    }
};
exports.projectManagerMiddleware = projectManagerMiddleware;
