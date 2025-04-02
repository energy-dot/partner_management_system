import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { serverConfig } from '../config/config';

// リクエストにユーザー情報を追加するための拡張インターフェース
export interface AuthRequest extends Request {
  userId?: number;
  username?: string;
  userRole?: string;
}

// 認証ミドルウェア
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
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
    const decoded = jwt.verify(token, serverConfig.jwtSecret) as any;
    
    // リクエストオブジェクトにユーザー情報を追加
    const authReq = req as AuthRequest;
    authReq.userId = decoded.id;
    authReq.username = decoded.username;
    authReq.userRole = decoded.role;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: '無効なトークンです'
    });
  }
};

// 管理者権限チェックミドルウェア
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const userRole = (req as any).userRole;
    
    if (userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'この操作には管理者権限が必要です'
      });
    }
    
    next();
  } catch (error) {
    console.error('Admin middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'サーバーエラーが発生しました'
    });
  }
};
