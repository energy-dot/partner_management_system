import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { serverConfig } from '../config/config';

// ユーザー認証コントローラー
class AuthController {
  // ログイン処理
  public async login(req: Request, res: Response): Promise<Response> {
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
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'ユーザー名またはパスワードが正しくありません'
        });
      }
      // パスワードの検証
      const isPasswordValid = await user.validatePassword(password);
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
      await user.save();
      // JWTトークンの生成
      const payload = { 
        id: user.id, 
        username: user.username, 
        role: user.role 
      };
      
      // @ts-ignore: 型エラーを一時的に無視
      const token = jwt.sign(
        payload,
        serverConfig.jwtSecret,
        { expiresIn: serverConfig.jwtExpiresIn }
      );
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
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
  // ログアウト処理
  public async logout(req: Request, res: Response): Promise<Response> {
    try {
      // クライアント側でトークンを削除するため、サーバー側では特に処理は不要
      return res.status(200).json({
        success: true,
        message: 'ログアウトに成功しました'
      });
    } catch (error) {
      console.error('Logout error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
  // パスワード変更処理
  public async changePassword(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.user?.id;
      const { currentPassword, newPassword } = req.body;
      // 入力チェック
      if (!currentPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: '現在のパスワードと新しいパスワードを入力してください'
        });
      }
      // ユーザーの検索
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'ユーザーが見つかりません'
        });
      }
      // 現在のパスワードの検証
      const isPasswordValid = await user.validatePassword(currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: '現在のパスワードが正しくありません'
        });
      }
      // パスワードの更新
      user.password = newPassword;
      await user.save();
      return res.status(200).json({
        success: true,
        message: 'パスワードの変更に成功しました'
      });
    } catch (error) {
      console.error('Change password error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
  // ユーザー情報取得
  public async getProfile(req: Request, res: Response): Promise<Response> {
    try {
      // リクエストからユーザーIDを取得（認証ミドルウェアで設定）
      const userId = req.user?.id;
      // ユーザーの検索
      const user = await User.findByPk(userId);
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
    } catch (error) {
      console.error('Get profile error:', error);
      return res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
      });
    }
  }
}
export default new AuthController();
