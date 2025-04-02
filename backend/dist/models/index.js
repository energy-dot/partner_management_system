"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
// Sequelizeインスタンスの作成
const sequelize = new sequelize_1.Sequelize(config_1.dbConfig.database, config_1.dbConfig.username, config_1.dbConfig.password, {
    host: config_1.dbConfig.host,
    port: config_1.dbConfig.port,
    dialect: 'postgres',
    pool: {
        max: config_1.dbConfig.pool.max,
        min: config_1.dbConfig.pool.min,
        acquire: config_1.dbConfig.pool.acquire,
        idle: config_1.dbConfig.pool.idle
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false
});
exports.default = sequelize;
