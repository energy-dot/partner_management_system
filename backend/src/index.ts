import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { serverConfig, corsConfig } from './config/config';
import sequelize from './models/index';

// ルートのインポート
import authRoutes from './routes/authRoutes';
import partnerRoutes from './routes/partnerRoutes';
import projectRoutes from './routes/projectRoutes';
import memberRoutes from './routes/memberRoutes';
import applicationRoutes from './routes/applicationRoutes';
import creditCheckRoutes from './routes/creditCheckRoutes';
import contractRoutes from './routes/contractRoutes';
import projectInvitationRoutes from './routes/projectInvitationRoutes';
import individualContractRoutes from './routes/individualContractRoutes';
import memberCommunicationRoutes from './routes/memberCommunicationRoutes';
import memberEvaluationRoutes from './routes/memberEvaluationRoutes';

// Expressアプリケーションの初期化
const app = express();

// ミドルウェアの設定
app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルートの設定
app.use('/api/auth', authRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/credit-checks', creditCheckRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/project-invitations', projectInvitationRoutes);
app.use('/api/individual-contracts', individualContractRoutes);
app.use('/api/member-communications', memberCommunicationRoutes);
app.use('/api/member-evaluations', memberEvaluationRoutes);

// ルートエンドポイント
app.get('/', (req, res) => {
  res.json({
    message: 'パートナー要員管理システム API',
    version: '1.0.0'
  });
});

// エラーハンドリングミドルウェア
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'サーバーエラーが発生しました'
  });
});

// サーバーの起動
const PORT = serverConfig.port;

const startServer = async () => {
  try {
    // データベース接続の確認
    await sequelize.authenticate();
    console.log('データベースに接続しました。');
    
    // 開発環境の場合はテーブルを同期
    if (serverConfig.env === 'development') {
      await sequelize.sync({ alter: true });
      console.log('データベーステーブルを同期しました。');
    }
    
    // サーバーの起動
    app.listen(PORT, () => {
      console.log(`サーバーが起動しました: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('サーバーの起動に失敗しました:', error);
    process.exit(1);
  }
};

startServer();
