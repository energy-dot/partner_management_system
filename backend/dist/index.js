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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config/config");
const index_1 = __importDefault(require("./models/index"));
// ルートのインポート
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const partnerRoutes_1 = __importDefault(require("./routes/partnerRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const memberRoutes_1 = __importDefault(require("./routes/memberRoutes"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const creditCheckRoutes_1 = __importDefault(require("./routes/creditCheckRoutes"));
const contractRoutes_1 = __importDefault(require("./routes/contractRoutes"));
const projectInvitationRoutes_1 = __importDefault(require("./routes/projectInvitationRoutes"));
const individualContractRoutes_1 = __importDefault(require("./routes/individualContractRoutes"));
const memberCommunicationRoutes_1 = __importDefault(require("./routes/memberCommunicationRoutes"));
const memberEvaluationRoutes_1 = __importDefault(require("./routes/memberEvaluationRoutes"));
// Expressアプリケーションの初期化
const app = (0, express_1.default)();
// ミドルウェアの設定
app.use((0, cors_1.default)(config_1.corsConfig));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// ルートの設定
app.use('/api/auth', authRoutes_1.default);
app.use('/api/partners', partnerRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/members', memberRoutes_1.default);
app.use('/api/applications', applicationRoutes_1.default);
app.use('/api/credit-checks', creditCheckRoutes_1.default);
app.use('/api/contracts', contractRoutes_1.default);
app.use('/api/project-invitations', projectInvitationRoutes_1.default);
app.use('/api/individual-contracts', individualContractRoutes_1.default);
app.use('/api/member-communications', memberCommunicationRoutes_1.default);
app.use('/api/member-evaluations', memberEvaluationRoutes_1.default);
// ルートエンドポイント
app.get('/', (req, res) => {
    res.json({
        message: 'パートナー要員管理システム API',
        version: '1.0.0'
    });
});
// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'サーバーエラーが発生しました'
    });
});
// サーバーの起動
const PORT = config_1.serverConfig.port;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // データベース接続の確認
        yield index_1.default.authenticate();
        console.log('データベースに接続しました。');
        // 開発環境の場合はテーブルを同期
        if (config_1.serverConfig.env === 'development') {
            yield index_1.default.sync({ alter: true });
            console.log('データベーステーブルを同期しました。');
        }
        // サーバーの起動
        app.listen(PORT, () => {
            console.log(`サーバーが起動しました: http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('サーバーの起動に失敗しました:', error);
        process.exit(1);
    }
});
startServer();
