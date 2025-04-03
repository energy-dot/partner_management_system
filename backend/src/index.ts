import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { serverConfig, corsConfig } from './config/config';
import sequelize from './models';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import partnerRoutes from './routes/partnerRoutes';
import projectRoutes from './routes/projectRoutes';
import memberRoutes from './routes/memberRoutes';
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
app.use('/api/users', userRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/credit-checks', creditCheckRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/project-invitations', projectInvitationRoutes);
app.use('/api/individual-contracts', individualContractRoutes);
app.use('/api/member-communications', memberCommunicationRoutes);
app.use('/api/member-evaluations', memberEvaluationRoutes);

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// データベース接続とサーバー起動
const startServer = async () => {
  try {
    // 開発環境ではデータベースを同期する（本番環境では注意が必要）
    if (serverConfig.env === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized');
    } else {
      await sequelize.authenticate();
      console.log('Database connection established');
    }

    // サーバーの起動
    app.listen(serverConfig.port, () => {
      console.log(`Server is running on port ${serverConfig.port}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

startServer();
