import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import sequelize from './index';
import Member from './Member';
import Project from './Project';
import Partner from './Partner';

// 応募モデルクラス
@Table({
  tableName: 'applications'
})
class Application extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

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
    type: DataType.STRING(100),
    allowNull: false
  })
  applicantName!: string;

  @ForeignKey(() => Partner)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  partnerId!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  skills!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  rate!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  applicationDate!: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  coverLetter!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  resumeUrl!: string;

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
  notes!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  interviewDate!: Date | null;

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
  @BelongsTo(() => Member)
  member!: Member;

  @BelongsTo(() => Project)
  project!: Project;

  @BelongsTo(() => Partner)
  partner!: Partner;
}

export default Application;
