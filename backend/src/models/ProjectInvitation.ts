import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import sequelize from './index';
import Project from './Project';
import Partner from './Partner';

// 案件募集送信モデルクラス
@Table({
  tableName: 'project_invitations'
})
class ProjectInvitation extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @ForeignKey(() => Project)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  projectId!: number;

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
  invitationDate!: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  message!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: '送信済'
  })
  status!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  responseDate!: Date | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  responseMessage!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  responseDeadline!: Date | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  remarks!: string;

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
  @BelongsTo(() => Project)
  project!: Project;

  @BelongsTo(() => Partner)
  partner!: Partner;
}

export default ProjectInvitation;
