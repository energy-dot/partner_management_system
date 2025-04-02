"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config/config");
const User_1 = __importDefault(require("./User"));
const Partner_1 = __importDefault(require("./Partner"));
const Project_1 = __importDefault(require("./Project"));
const Member_1 = __importDefault(require("./Member"));
const Application_1 = __importDefault(require("./Application"));
const CreditCheck_1 = __importDefault(require("./CreditCheck"));
const Contract_1 = __importDefault(require("./Contract"));
const ProjectInvitation_1 = __importDefault(require("./ProjectInvitation"));
const IndividualContract_1 = __importDefault(require("./IndividualContract"));
const MemberCommunication_1 = __importDefault(require("./MemberCommunication"));
const MemberEvaluation_1 = __importDefault(require("./MemberEvaluation"));
// Sequelizeインスタンスの作成
const sequelize = new sequelize_typescript_1.Sequelize({
    database: config_1.dbConfig.database,
    username: config_1.dbConfig.username,
    password: config_1.dbConfig.password,
    host: config_1.dbConfig.host,
    port: config_1.dbConfig.port,
    dialect: 'postgres',
    pool: {
        max: config_1.dbConfig.pool.max,
        min: config_1.dbConfig.pool.min,
        acquire: config_1.dbConfig.pool.acquire,
        idle: config_1.dbConfig.pool.idle
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    models: [
        User_1.default,
        Partner_1.default,
        Project_1.default,
        Member_1.default,
        Application_1.default,
        CreditCheck_1.default,
        Contract_1.default,
        ProjectInvitation_1.default,
        IndividualContract_1.default,
        MemberCommunication_1.default,
        MemberEvaluation_1.default
    ]
});
exports.default = sequelize;
