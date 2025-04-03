import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

// DataTypesをインポートして値として使用できるようにする


import sequelize from './index';
import Partner from './Partner';
import IndividualContract from './IndividualContract';

// 基本契約モデルクラス
@Table({
  tableName: 'contracts'
})
class Contract extends Model {
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
    type: DataType.STRING(50),
    allowNull: false
  })
  contractNumber!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  startDate!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  endDate!: Date | null;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: '作成中'
  })
  status!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  terms!: string;

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

  @HasMany(() => IndividualContract)
  individualContracts!: IndividualContract[];
}

export default Contract;