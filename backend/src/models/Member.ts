import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import sequelize from './index';
import Partner from './Partner';
import Project from './Project';

// パートナー企業モデルクラス
@Table({
  tableName: 'members'
})
class Member extends Model {
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

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  projectId!: number | null;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  email!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: true
  })
  phone!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  position!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  skillLevel!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  skills!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  experience!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: '稼働中'
  })
  status!: string;

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

  @BelongsTo(() => Project)
  project!: Project;
}

export default Member;
