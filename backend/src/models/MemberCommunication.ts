import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

// DataTypesをインポートして値として使用できるようにする


import sequelize from './index';
import Member from './Member';
import User from './User';

// 要員連絡・依頼モデルクラス
@Table({
  tableName: 'member_communications'
})
class MemberCommunication extends Model {
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
    type: DataType.STRING(20),
    allowNull: false,
    validate: {
      isIn: [['連絡', '依頼', '通知', '質問', 'その他']]
    }
  })
  type!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  content!: string;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    defaultValue: '未対応',
    validate: {
      isIn: [['未対応', '対応中', '完了', 'キャンセル']]
    }
  })
  status!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true
  })
  dueDate!: Date | null;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true
  })
  completedDate!: Date | null;

  @Column({
    type: DataType.STRING(255),
    allowNull: true
  })
  attachmentFile!: string | null;

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

export default MemberCommunication;