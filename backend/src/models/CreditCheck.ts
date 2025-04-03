import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

// DataTypesをインポートして値として使用できるようにする


import sequelize from './index';
import Partner from './Partner';

// 信用調査/反社チェックモデルクラス
@Table({
  tableName: 'credit_checks'
})
class CreditCheck extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @ForeignKey(() => Partner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  partnerId!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  checkDate!: Date;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  checkType!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: '審査中'
  })
  status!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  result!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  documentUrl!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  updatedAt!: Date;

  // リレーションシップ
  @BelongsTo(() => Partner)
  partner!: Partner;
}

export default CreditCheck;