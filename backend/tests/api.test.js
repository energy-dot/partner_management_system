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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("../src/config/config");
const database_1 = __importDefault(require("../src/config/database"));
// ルートのインポート
const authRoutes_1 = __importDefault(require("../src/routes/authRoutes"));
const partnerRoutes_1 = __importDefault(require("../src/routes/partnerRoutes"));
const projectRoutes_1 = __importDefault(require("../src/routes/projectRoutes"));
const memberRoutes_1 = __importDefault(require("../src/routes/memberRoutes"));
const applicationRoutes_1 = __importDefault(require("../src/routes/applicationRoutes"));
// テスト用のExpressアプリケーションの初期化
const app = (0, express_1.default)();
// ミドルウェアの設定
app.use((0, cors_1.default)(config_1.corsConfig));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ルートの設定
app.use('/api/auth', authRoutes_1.default);
app.use('/api/partners', partnerRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/members', memberRoutes_1.default);
app.use('/api/applications', applicationRoutes_1.default);
// ルートエンドポイント
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running' });
});
// APIエンドポイントのテスト
describe('API Endpoints Tests', () => {
    // テスト前にデータベース接続を確認
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield database_1.default.authenticate();
            console.log('データベースに接続しました。');
            // テスト用のデータベースを同期
            yield database_1.default.sync({ force: true });
            console.log('テスト用データベーステーブルを同期しました。');
        }
        catch (error) {
            console.error('データベース接続エラー:', error);
        }
    }));
    // テスト後にデータベース接続を閉じる
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.close();
    }));
    // ルートエンドポイントのテスト
    test('GET / - ルートエンドポイントのテスト', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message');
    }));
    // 認証APIのテスト
    describe('Auth API Tests', () => {
        // ユーザー登録のテスト（実装されていない場合はスキップ）
        test.skip('POST /api/auth/register - ユーザー登録', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app)
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
        }));
        // ログインのテスト（ユーザーが存在しないためエラーになる）
        test('POST /api/auth/login - ログイン（失敗）', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app)
                .post('/api/auth/login')
                .send({
                username: 'testuser',
                password: 'password123'
            });
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('success', false);
        }));
    });
    // パートナー会社APIのテスト
    describe('Partner API Tests', () => {
        // 認証なしでアクセスするとエラーになる
        test('GET /api/partners - 認証なしでアクセス', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app).get('/api/partners');
            expect(res.statusCode).toEqual(401);
        }));
    });
    // 案件APIのテスト
    describe('Project API Tests', () => {
        // 認証なしでアクセスするとエラーになる
        test('GET /api/projects - 認証なしでアクセス', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app).get('/api/projects');
            expect(res.statusCode).toEqual(401);
        }));
    });
    // 要員APIのテスト
    describe('Member API Tests', () => {
        // 認証なしでアクセスするとエラーになる
        test('GET /api/members - 認証なしでアクセス', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app).get('/api/members');
            expect(res.statusCode).toEqual(401);
        }));
    });
    // 応募APIのテスト
    describe('Application API Tests', () => {
        // 認証なしでアクセスするとエラーになる
        test('GET /api/applications - 認証なしでアクセス', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app).get('/api/applications');
            expect(res.statusCode).toEqual(401);
        }));
    });
});
