import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from './index';

// パートナー会社の属性を定義
interface PartnerAttributes {
  id: number;
  name: string;
  address: string;
  phone: string;
  representative: string;
  establishedDate: Date;
  employeeCount: number;
  businessDescription: string;
  status: string;
  creditCheckDate: Date | null;
  antiSocialCheckDate: Date | null;
  remarks: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// 作成時のオプション属性（自動生成される属性）
interface PartnerCreationAttributes extends Optional<PartnerAttributes, 'id' | 'creditCheckDate' | 'antiSocialCheckDate' | 'remarks' | 'createdAt' | 'updatedAt'> {}

// パートナー会社モデルクラス
class Partner extends Model<PartnerAttributes, PartnerCreationAttributes> implements PartnerAttributes {
  public id!: number;
  public name!: string;
  public address!: string;
  public phone!: string;
  public representative!: string;
  public establishedDate!: Date;
  public employeeCount!: number;
  public businessDescription!: string;
  public status!: string;
  public creditCheckDate!: Date | null;
  public antiSocialCheckDate!: Date | null;
  public remarks!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// パートナー会社モデルの初期化
Partner.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    representative: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    establishedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    employeeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    businessDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: '候補',
      validate: {
        isIn: [['候補', '取引中', '取引停止']]
      }
    },
    creditCheckDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    antiSocialCheckDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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
    modelName: 'Partner',
    tableName: 'partners',
  }
);

export default Partner;
