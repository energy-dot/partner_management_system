import express from 'express';
import UserController from '../controllers/UserController';

const router = express.Router();

// ユーザー一覧取得
router.get('/', (req, res) => UserController.getAllUsers(req, res));

// 特定ユーザー取得
router.get('/:id', (req, res) => UserController.getUserById(req, res));

// ユーザー作成
router.post('/', (req, res) => UserController.createUser(req, res));

// ユーザー更新
router.put('/:id', (req, res) => UserController.updateUser(req, res));

// ユーザー削除
router.delete('/:id', (req, res) => UserController.deleteUser(req, res));

export default router;
