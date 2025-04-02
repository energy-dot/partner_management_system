import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';
import Partner from './Partner';
import Project from './Project';

// 応募の属性を定義
interface ApplicationAttributes {
  id: number;
  applicantName: string;
  partnerId: number;
  skills: string;
  projectId: number;
  appliedDate: Date;
  rate: number;
  status: string;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// 作成時のオプション属性（自動生成される属性）
interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, 'id' | 'remarks' | 'createdAt' | 'updatedAt'> {}

// 応募モデルクラス
class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes> implements ApplicationAttributes {
  public id!: number;
  public applicantName!: string;
  public partnerId!: number;
  public skills!: string;
  public projectId!: number;
  public appliedDate!: Date;
  public rate!: number;
  public status!: string;
  public remarks!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 応募モデルの初期化
Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicantName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    partnerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'partners',
        key: 'id'
      }
    },
    skills: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    appliedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '審査中',
      validate: {
        isIn: [['審査中', '承認済', '却下']]
      }
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Application',
    tableName: 'applications',
  }
);

// リレーションシップの設定
Application.belongsTo(Partner, { foreignKey: 'partnerId' });
Partner.hasMany(Application, { foreignKey: 'partnerId' });

Application.belongsTo(Project, { foreignKey: 'projectId' });
Project.hasMany(Application, { foreignKey: 'projectId' });

export default Application;
