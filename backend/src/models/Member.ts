import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';
import Partner from './Partner';
import Project from './Project';

// 要員の属性を定義
interface MemberAttributes {
  id: number;
  name: string;
  partnerId: number;
  skills: string;
  projectId: number | null;
  startDate: Date;
  endDate: Date | null;
  rate: number;
  status: string;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// 作成時のオプション属性（自動生成される属性）
interface MemberCreationAttributes extends Optional<MemberAttributes, 'id' | 'projectId' | 'endDate' | 'remarks' | 'createdAt' | 'updatedAt'> {}

// 要員モデルクラス
class Member extends Model<MemberAttributes, MemberCreationAttributes> implements MemberAttributes {
  public id!: number;
  public name!: string;
  public partnerId!: number;
  public skills!: string;
  public projectId!: number | null;
  public startDate!: Date;
  public endDate!: Date | null;
  public rate!: number;
  public status!: string;
  public remarks!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 要員モデルの初期化
Member.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
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
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '稼働中',
      validate: {
        isIn: [['稼働中', '契約終了予定', '契約終了', '休業中']]
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
    modelName: 'Member',
    tableName: 'members',
  }
);

// リレーションシップの設定
Member.belongsTo(Partner, { foreignKey: 'partnerId' });
Partner.hasMany(Member, { foreignKey: 'partnerId' });

Member.belongsTo(Project, { foreignKey: 'projectId' });
Project.hasMany(Member, { foreignKey: 'projectId' });

export default Member;
