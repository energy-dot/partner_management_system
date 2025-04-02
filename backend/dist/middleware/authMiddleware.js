"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
// 認証ミドルウェア
const authMiddleware = (req, res, next) => {
    try {
        // ヘッダーからトークンを取得
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({
                success: false,
                message: '認証が必要です'
            });
            return;
        }
        const token = authHeader.split(' ')[1];
        // トークンの検証
        const decoded = jsonwebtoken_1.default.verify(token, config_1.serverConfig.jwtSecret);
        // リクエストオブジェクトにユーザー情報を追加
        const authReq = req;
        authReq.userId = decoded.id;
        authReq.username = decoded.username;
        authReq.userRole = decoded.role;
        next();
    }
    catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({
            success: false,
            message: '無効なトークンです'
        });
    }
};
exports.authMiddleware = authMiddleware;
// 管理者権限チェックミドルウェア
const adminMiddleware = (req, res, next) => {
    try {
        const userRole = req.userRole;
        if (userRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'この操作には管理者権限が必要です'
            });
        }
        next();
    }
    catch (error) {
        console.error('Admin middleware error:', error);
        return res.status(500).json({
            success: false,
            message: 'サーバーエラーが発生しました'
        });
    }
};
exports.adminMiddleware = adminMiddleware;
