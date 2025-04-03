import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from './config';
import User from '../models/User';
import Partner from '../models/Partner';
import Project from '../models/Project';
import Member from '../models/Member';
import Contract from '../models/Contract';
import IndividualContract from '../models/IndividualContract';
import CreditCheck from '../models/CreditCheck';
import MemberCommunication from '../models/MemberCommunication';
import MemberEvaluation from '../models/MemberEvaluation';
import ProjectInvitation from '../models/ProjectInvitation';
import Application from '../models/Application';

// データベース接続の設定
export const sequelize = new Sequelize({
  dialect: dbConfig.dialect as any,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  logging: false,
  models: [
    User,
    Partner,
    Project,
    Member,
    Contract,
    IndividualContract,
    CreditCheck,
    MemberCommunication,
    MemberEvaluation,
    ProjectInvitation,
    Application
  ],
  // テスト環境ではSQLiteのインメモリデータベースを使用
  ...(process.env.NODE_ENV === 'test' && {
    dialect: 'sqlite',
    storage: ':memory:',
    sync: { force: true }
  })
});

export default sequelize;
