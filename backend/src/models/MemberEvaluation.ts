import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import sequelize from './index';
import Member from './Member';
import User from './User';

// 要員評価モデルクラス
@Table({
  tableName: 'member_evaluations'
})
class MemberEvaluation extends Model {
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  userId!: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    defaultValue: DataType.NOW
  })
  evaluationDate!: Date;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  projectName!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  })
  technicalSkill!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  })
  communicationSkill!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  })
  teamworkSkill!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  })
  leadershipSkill!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  })
  overallRating!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  strengths!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  weaknesses!: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  comments!: string | null;

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

  @BelongsTo(() => User)
  user!: User;
}

export default MemberEvaluation;
