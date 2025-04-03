import express from 'express';
import AuthController from '../controllers/AuthController';

const router = express.Router();

// ログインルート
router.post('/login', (req, res) => AuthController.login(req, res));

// ログアウトルート
router.post('/logout', (req, res) => AuthController.logout(req, res));

// パスワード変更ルート
router.post('/change-password', (req, res) => AuthController.changePassword(req, res));

export default router;
