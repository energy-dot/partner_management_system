import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import sequelize from './index';
import Member from './Member';

// パートナー企業モデルクラス
@Table({
  tableName: 'partners'
})
class Partner extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  id!: number;
  
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  name!: string;
  
  @Column({
    type: DataType.STRING(100),
    allowNull: false
  })
  address!: string;
  
  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  phone!: string;
  
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  email!: string;
  
  @Column({
    type: DataType.STRING(100),
    allowNull: true
  })
  website!: string;
  
  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  contactPerson!: string;
  
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
  creditCheckDate!: Date | null;
  
  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  antiSocialCheckDate!: Date | null;
  
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
  
  // テスト用に追加したプロパティ
  @Column({
    type: DataType.STRING(50),
    allowNull: true
  })
  representative!: string;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: true
  })
  employeeCount!: number;
  
  @Column({
    type: DataType.TEXT,
    allowNull: true
  })
  businessDescription!: string;
  
  @Column({
    type: DataType.DATE,
    allowNull: true
  })
  establishedDate!: Date | null;
  
  // リレーションシップ
  @HasMany(() => Member)
  members!: Member[];
}

export default Partner;
