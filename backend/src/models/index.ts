import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from '../config/config';
import User from './User';
import Partner from './Partner';
import Project from './Project';
import Member from './Member';
import Contract from './Contract';
import IndividualContract from './IndividualContract';
import CreditCheck from './CreditCheck';
import MemberCommunication from './MemberCommunication';
import MemberEvaluation from './MemberEvaluation';
import ProjectInvitation from './ProjectInvitation';
import Application from './Application';

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
  ]
});

export default sequelize;
