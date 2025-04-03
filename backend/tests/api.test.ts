import request from 'supertest';
import express from 'express';
import cors from 'cors';
import { serverConfig, corsConfig } from '../src/config/config';
import sequelize from '../src/config/database';
// ルートのインポート
import authRoutes from '../src/routes/authRoutes';
import partnerRoutes from '../src/routes/partnerRoutes';
import projectRoutes from '../src/routes/projectRoutes';
import memberRoutes from '../src/routes/memberRoutes';
import applicationRoutes from '../src/routes/applicationRoutes';
// テスト用のExpressアプリケーションの初期化
const app = express();
// ミドルウェアの設定
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ルートの設定
app.use('/api/auth', authRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/applications', applicationRoutes);

// ルートエンドポイント
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

// APIエンドポイントのテスト
describe('API Endpoints Tests', () => {
  
  // テスト前にデータベース接続を確認
  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      console.log('データベースに接続しました。');
      
      // テスト用のデータベースを同期
      await sequelize.sync({ force: true });
      console.log('テスト用データベーステーブルを同期しました。');
    } catch (error) {
      console.error('データベース接続エラー:', error);
    }
  });
  // テスト後にデータベース接続を閉じる
  afterAll(async () => {
    await sequelize.close();
  });
  // ルートエンドポイントのテスト
  test('GET / - ルートエンドポイントのテスト', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
  // 認証APIのテスト
  describe('Auth API Tests', () => {
    // ユーザー登録のテスト（実装されていない場合はスキップ）
    test.skip('POST /api/auth/register - ユーザー登録', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          password: 'password123',
          fullName: 'Test User',
          email: 'test@example.com',
          role: 'user',
          department: 'IT'
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('success', true);
    });
    // ログインのテスト（ユーザーが存在しないためエラーになる）
    test('POST /api/auth/login - ログイン（失敗）', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'password123'
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('success', false);
    });
  });
  // パートナー会社APIのテスト
  describe('Partner API Tests', () => {
    // 認証なしでアクセスするとエラーになる
    test('GET /api/partners - 認証なしでアクセス', async () => {
      const res = await request(app).get('/api/partners');
      expect(res.statusCode).toEqual(401);
    });
  });
  // 案件APIのテスト
  describe('Project API Tests', () => {
    // 認証なしでアクセスするとエラーになる
    test('GET /api/projects - 認証なしでアクセス', async () => {
      const res = await request(app).get('/api/projects');
      expect(res.statusCode).toEqual(401);
    });
  });
  // 要員APIのテスト
  describe('Member API Tests', () => {
    // 認証なしでアクセスするとエラーになる
    test('GET /api/members - 認証なしでアクセス', async () => {
      const res = await request(app).get('/api/members');
      expect(res.statusCode).toEqual(401);
    });
  });
  // 応募APIのテスト
  describe('Application API Tests', () => {
    // 認証なしでアクセスするとエラーになる
    test('GET /api/applications - 認証なしでアクセス', async () => {
      const res = await request(app).get('/api/applications');
      expect(res.statusCode).toEqual(401);
    });
  });
});
