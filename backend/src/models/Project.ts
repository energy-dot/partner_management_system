import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import sequelize from './index';
import Application from './Application';
import ProjectInvitation from './ProjectInvitation';

// プロジェクトモデルクラス
@Table({
  tableName: 'projects'
})
class Project extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  location!: string;

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
  requiredMembers!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  requiredSkills!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: '計画中'
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
  @HasMany(() => Application)
  applications!: Application[];

  @HasMany(() => ProjectInvitation)
  invitations!: ProjectInvitation[];
}

export default Project;
