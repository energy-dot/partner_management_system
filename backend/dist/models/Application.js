"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const Partner_1 = __importDefault(require("./Partner"));
const Project_1 = __importDefault(require("./Project"));
// 応募モデルクラス
class Application extends sequelize_1.Model {
}
// 応募モデルの初期化
Application.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    applicantName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    partnerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'partners',
            key: 'id'
        }
    },
    skills: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    projectId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    appliedDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    rate: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '審査中',
        validate: {
            isIn: [['審査中', '承認済', '却下']]
        }
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
    modelName: 'Application',
    tableName: 'applications',
});
// リレーションシップの設定
Application.belongsTo(Partner_1.default, { foreignKey: 'partnerId' });
Partner_1.default.hasMany(Application, { foreignKey: 'partnerId' });
Application.belongsTo(Project_1.default, { foreignKey: 'projectId' });
Project_1.default.hasMany(Application, { foreignKey: 'projectId' });
exports.default = Application;
