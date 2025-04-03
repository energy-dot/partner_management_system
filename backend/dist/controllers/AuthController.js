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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const config_1 = require("../config/config");
// ユーザー認証コントローラー
class AuthController {
    // ログイン処理
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                // 入力チェック
                if (!username || !password) {
                    return res.status(400).json({
                        success: false,
                        message: 'ユーザー名とパスワードを入力してください'
                    });
                }
                // ユーザーの検索
                const user = yield User_1.default.findOne({ where: { username } });
                if (!user) {
                    return res.status(401).json({
                        success: false,
                        message: 'ユーザー名またはパスワードが正しくありません'
                    });
                }
                // パスワードの検証
                const isPasswordValid = yield user.validatePassword(password);
                if (!isPasswordValid) {
                    return res.status(401).json({
                        success: false,
                        message: 'ユーザー名またはパスワードが正しくありません'
                    });
                }
                // アクティブ状態の確認
                if (!user.isActive) {
                    return res.status(401).json({
                        success: false,
                        message: 'このアカウントは無効化されています'
                    });
                }
                // 最終ログイン日時の更新
                user.lastLogin = new Date();
                yield user.save();
                // JWTトークンの生成
                const payload = {
                    id: user.id,
                    username: user.username,
                    role: user.role
                };
                // @ts-ignore: 型エラーを一時的に無視
                const token = jsonwebtoken_1.default.sign(payload, config_1.serverConfig.jwtSecret, { expiresIn: config_1.serverConfig.jwtExpiresIn });
                // ユーザー情報からパスワードを除外
                const userWithoutPassword = {
                    id: user.id,
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    department: user.department
                };
                return res.status(200).json({
                    success: true,
                    message: 'ログインに成功しました',
                    token,
                    user: userWithoutPassword
                });
            }
            catch (error) {
                console.error('Login error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
    // ユーザー情報取得
    getProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // リクエストからユーザーIDを取得（認証ミドルウェアで設定）
                const authReq = req;
                const userId = authReq.userId;
                // ユーザーの検索
                const user = yield User_1.default.findByPk(userId);
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        message: 'ユーザーが見つかりません'
                    });
                }
                // ユーザー情報からパスワードを除外
                const userWithoutPassword = {
                    id: user.id,
                    username: user.username,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    department: user.department
                };
                return res.status(200).json({
                    success: true,
                    user: userWithoutPassword
                });
            }
            catch (error) {
                console.error('Get profile error:', error);
                return res.status(500).json({
                    success: false,
                    message: 'サーバーエラーが発生しました'
                });
            }
        });
    }
}
exports.default = new AuthController();
