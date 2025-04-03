import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Member from './Member';
import Project from './Project';

@Table({
  tableName: 'applications',
  timestamps: true
})
class Application extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    type: DataType.DATE,
    allowNull: false
  })
  applicationDate!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  status!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  notes?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  resumeUrl?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  interviewDate?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  interviewResult?: string;

  // リレーションシップ
  @BelongsTo(() => Member)
  member!: Member;

  @BelongsTo(() => Project)
  project!: Project;
}

export default Application;
