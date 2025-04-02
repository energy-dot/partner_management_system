"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const Partner_1 = __importDefault(require("./Partner"));
const Project_1 = __importDefault(require("./Project"));
// 要員モデルクラス
class Member extends sequelize_1.Model {
}
// 要員モデルの初期化
Member.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
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
        allowNull: true,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    startDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    endDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true,
    },
    rate: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
        defaultValue: '稼働中',
        validate: {
            isIn: [['稼働中', '契約終了予定', '契約終了', '休業中']]
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
    modelName: 'Member',
    tableName: 'members',
});
// リレーションシップの設定
Member.belongsTo(Partner_1.default, { foreignKey: 'partnerId' });
Partner_1.default.hasMany(Member, { foreignKey: 'partnerId' });
Member.belongsTo(Project_1.default, { foreignKey: 'projectId' });
Project_1.default.hasMany(Member, { foreignKey: 'projectId' });
exports.default = Member;
