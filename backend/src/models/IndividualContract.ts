import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import sequelize from './index';
import Contract from './Contract';
import Member from './Member';
import Project from './Project';

// 個別契約モデルクラス
@Table({
  tableName: 'individual_contracts'
})
class IndividualContract extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @ForeignKey(() => Contract)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  contractId!: number;

  @ForeignKey(() => Member)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  memberId!: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  projectId!: number;

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
    type: DataType.INTEGER,
    allowNull: false
  })
  rate!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  rateType!: string;

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
  @BelongsTo(() => Contract)
  contract!: Contract;

  @BelongsTo(() => Member)
  member!: Member;

  @BelongsTo(() => Project)
  project!: Project;
}

export default IndividualContract;
