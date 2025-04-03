import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { serverConfig } from '../config/config';

// 認証ミドルウェア
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // テスト環境では認証をスキップ
  if (process.env.NODE_ENV === 'test') {
    return next();
  }

  // ヘッダーからトークンを取得
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: '認証トークンがありません'
    });
  }
  
  try {
    // トークンを検証
    const decoded = jwt.verify(token, serverConfig.jwtSecret);
    
    // リクエストオブジェクトにユーザー情報を追加
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: '無効な認証トークンです'
    });
  }
};

// 管理者権限チェックミドルウェア
export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: '管理者権限が必要です'
    });
  }
};

// パートナー管理者権限チェックミドルウェア
export const partnerAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'partner_admin')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'パートナー管理者権限が必要です'
    });
  }
};

// プロジェクト管理者権限チェックミドルウェア
export const projectManagerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'admin' || req.user.role === 'project_manager')) {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'プロジェクト管理者権限が必要です'
    });
  }
};
