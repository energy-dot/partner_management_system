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
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("./config/config");
const models_1 = __importDefault(require("./models"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const partnerRoutes_1 = __importDefault(require("./routes/partnerRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const memberRoutes_1 = __importDefault(require("./routes/memberRoutes"));
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
app.use('/api/users', userRoutes_1.default);
app.use('/api/partners', partnerRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.use('/api/members', memberRoutes_1.default);
app.use('/api/credit-checks', creditCheckRoutes_1.default);
app.use('/api/contracts', contractRoutes_1.default);
app.use('/api/project-invitations', projectInvitationRoutes_1.default);
app.use('/api/individual-contracts', individualContractRoutes_1.default);
app.use('/api/member-communications', memberCommunicationRoutes_1.default);
app.use('/api/member-evaluations', memberEvaluationRoutes_1.default);
// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
// データベース接続とサーバー起動
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 開発環境ではデータベースを同期する（本番環境では注意が必要）
        if (config_1.serverConfig.env === 'development') {
            yield models_1.default.sync({ alter: true });
            console.log('Database synchronized');
        }
        else {
            yield models_1.default.authenticate();
            console.log('Database connection established');
        }
        // サーバーの起動
        app.listen(config_1.serverConfig.port, () => {
            console.log(`Server is running on port ${config_1.serverConfig.port}`);
        });
    }
    catch (error) {
        console.error('Unable to start server:', error);
    }
});
startServer();
