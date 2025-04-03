"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("./config");
const User_1 = __importDefault(require("../models/User"));
const Partner_1 = __importDefault(require("../models/Partner"));
const Project_1 = __importDefault(require("../models/Project"));
const Member_1 = __importDefault(require("../models/Member"));
const Contract_1 = __importDefault(require("../models/Contract"));
const IndividualContract_1 = __importDefault(require("../models/IndividualContract"));
const CreditCheck_1 = __importDefault(require("../models/CreditCheck"));
const MemberCommunication_1 = __importDefault(require("../models/MemberCommunication"));
const MemberEvaluation_1 = __importDefault(require("../models/MemberEvaluation"));
const ProjectInvitation_1 = __importDefault(require("../models/ProjectInvitation"));
const Application_1 = __importDefault(require("../models/Application"));
// データベース接続の設定
exports.sequelize = new sequelize_typescript_1.Sequelize({
    dialect: config_1.dbConfig.dialect,
    host: config_1.dbConfig.host,
    port: config_1.dbConfig.port,
    username: config_1.dbConfig.username,
    password: config_1.dbConfig.password,
    database: config_1.dbConfig.database,
    logging: false,
    models: [
        User_1.default,
        Partner_1.default,
        Project_1.default,
        Member_1.default,
        Contract_1.default,
        IndividualContract_1.default,
        CreditCheck_1.default,
        MemberCommunication_1.default,
        MemberEvaluation_1.default,
        ProjectInvitation_1.default,
        Application_1.default
    ]
});
exports.default = exports.sequelize;
