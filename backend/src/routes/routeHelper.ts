import { Request, Response, NextFunction } from 'express';

/**
 * ルートハンドラーのラッパー関数
 * エラーハンドリングを統一的に処理するためのユーティリティ
 */
export const asyncHandler = (fn: (req: Request, res: Response) => Promise<void>) => {
  return (req: Request, res: Response, _next: NextFunction): void => {
    Promise.resolve(fn(req, res)).catch((err) => {
      console.error('Route error:', err);
      res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    });
  };
};

/**
 * 標準的なレスポンス形式を提供するユーティリティ
 */
export const sendResponse = (
  res: Response, 
  statusCode: number, 
  success: boolean, 
  message: string, 
  data?: any
): void => {
  res.status(statusCode).json({
    success,
    message,
    data
  });
};
