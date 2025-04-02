import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

// 案件の属性を定義
interface ProjectAttributes {
  id: number;
  code: string;
  name: string;
  department: string;
  manager: string;
  startDate: Date;
  endDate: Date;
  description: string;
  requiredSkills: string;
  headcount: number;
  status: string;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// 作成時のオプション属性（自動生成される属性）
interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id' | 'remarks' | 'createdAt' | 'updatedAt'> {}

// 案件モデルクラス
class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public id!: number;
  public code!: string;
  public name!: string;
  public department!: string;
  public manager!: string;
  public startDate!: Date;
  public endDate!: Date;
  public description!: string;
  public requiredSkills!: string;
  public headcount!: number;
  public status!: string;
  public remarks!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// 案件モデルの初期化
Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    manager: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requiredSkills: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    headcount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '下書き',
      validate: {
        isIn: [['下書き', '承認待ち', '募集中', '充足', '終了', '中止']]
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
    modelName: 'Project',
    tableName: 'projects',
  }
);

export default Project;
