"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
// パートナー会社モデルクラス
class Partner extends sequelize_1.Model {
}
// パートナー会社モデルの初期化
Partner.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
    representative: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    establishedDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    employeeCount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    businessDescription: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '候補',
        validate: {
            isIn: [['候補', '取引中', '取引停止']]
        }
    },
    creditCheckDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    antiSocialCheckDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    remarks: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: index_1.default,
    modelName: 'Partner',
    tableName: 'partners',
});
exports.default = Partner;
