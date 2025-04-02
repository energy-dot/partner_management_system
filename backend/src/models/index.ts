import { Sequelize } from 'sequelize-typescript';
import { dbConfig } from '../config/config';
import User from './User';
import Partner from './Partner';
import Project from './Project';
import Member from './Member';
import Application from './Application';
import CreditCheck from './CreditCheck';
import Contract from './Contract';
import ProjectInvitation from './ProjectInvitation';
import IndividualContract from './IndividualContract';
import MemberCommunication from './MemberCommunication';
import MemberEvaluation from './MemberEvaluation';

// Sequelizeインスタンスの作成
const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres',
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  models: [
    User,
    Partner,
    Project,
    Member,
    Application,
    CreditCheck,
    Contract,
    ProjectInvitation,
    IndividualContract,
    MemberCommunication,
    MemberEvaluation
  ]
});

export default sequelize;
