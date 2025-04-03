import { sequelize } from '../src/config/database';
import User from '../src/models/User';
import Partner from '../src/models/Partner';
import Project from '../src/models/Project';
import Member from '../src/models/Member';

describe('Model Tests', () => {
  // テスト前にデータベースに接続
  beforeAll(async () => {
    try {
      await sequelize.authenticate();
      console.log('データベースに接続しました。');
      
      // テスト用のデータベースを同期
      await sequelize.sync({ force: true });
      console.log('テスト用データベーステーブルを同期しました。');
    } catch (error) {
      console.error('データベース接続エラー:', error);
    }
  });
  // テスト後にデータベース接続を閉じる
  afterAll(async () => {
    await sequelize.close();
  });
  // ユーザーモデルのテスト
  describe('User Model Tests', () => {
    test('ユーザーの作成', async () => {
      const userData = {
        username: 'testuser',
        password: 'password123',
        fullName: 'Test User',
        email: 'test@example.com',
        role: 'user',
        department: 'IT'
      };
      
      const user = await User.create(userData);
      expect(user).toHaveProperty('id');
      expect(user.username).toBe(userData.username);
      expect(user.fullName).toBe(userData.fullName);
      expect(user.email).toBe(userData.email);
      expect(user.role).toBe(userData.role);
      expect(user.department).toBe(userData.department);
      
      // パスワードがハッシュ化されていることを確認
      expect(user.password).not.toBe(userData.password);
      
      // パスワード検証メソッドのテスト
      const isValid = await user.validatePassword(userData.password);
      expect(isValid).toBe(true);
      
      const isInvalid = await user.validatePassword('wrongpassword');
      expect(isInvalid).toBe(false);
    });
  });
  // パートナー会社モデルのテスト
  describe('Partner Model Tests', () => {
    test('パートナー会社の作成', async () => {
      const partnerData = {
        name: 'テスト株式会社',
        address: '東京都渋谷区1-1-1',
        phone: '03-1234-5678',
        representative: '山田太郎',
        establishedDate: new Date('2000-01-01'),
        employeeCount: 50,
        businessDescription: 'ITコンサルティング',
        status: '取引中'
      };
      
      const partner = await Partner.create(partnerData);
      expect(partner).toHaveProperty('id');
      expect(partner.name).toBe(partnerData.name);
      expect(partner.address).toBe(partnerData.address);
      expect(partner.phone).toBe(partnerData.phone);
      expect(partner.representative).toBe(partnerData.representative);
      expect(partner.employeeCount).toBe(partnerData.employeeCount);
      expect(partner.businessDescription).toBe(partnerData.businessDescription);
      expect(partner.status).toBe(partnerData.status);
    });
  });
  // 案件モデルのテスト
  describe('Project Model Tests', () => {
    test('案件の作成', async () => {
      const projectData = {
        code: 'PRJ-001',
        name: 'テストプロジェクト',
        department: '開発部',
        manager: '佐藤次郎',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31'),
        description: 'Webアプリケーション開発',
        requiredSkills: 'React, Node.js, TypeScript',
        headcount: 3,
        status: '募集中'
      };
      
      const project = await Project.create(projectData);
      expect(project).toHaveProperty('id');
      expect(project.code).toBe(projectData.code);
      expect(project.name).toBe(projectData.name);
      expect(project.department).toBe(projectData.department);
      // Projectモデルのプロパティ名を修正
      expect(project.manager).toBe(projectData.manager);
      expect(project.description).toBe(projectData.description);
      expect(project.requiredSkills).toBe(projectData.requiredSkills);
      expect(project.headcount).toBe(projectData.headcount);
      expect(project.status).toBe(projectData.status);
    });
  });
  // リレーションシップのテスト
  describe('Relationship Tests', () => {
    test('パートナー会社と要員のリレーションシップ', async () => {
      // パートナー会社の作成
      const partner = await Partner.create({
        name: 'リレーションテスト株式会社',
        address: '東京都新宿区1-1-1',
        phone: '03-9876-5432',
        representative: '鈴木三郎',
        establishedDate: new Date('2005-01-01'),
        employeeCount: 30,
        businessDescription: 'システム開発',
        status: '取引中'
      });
      
      // 案件の作成
      const project = await Project.create({
        code: 'PRJ-002',
        name: 'リレーションテストプロジェクト',
        department: '開発部',
        manager: '高橋四郎',
        startDate: new Date('2023-02-01'),
        endDate: new Date('2023-11-30'),
        description: 'モバイルアプリ開発',
        requiredSkills: 'React Native, TypeScript',
        headcount: 2,
        status: '募集中'
      });
      
      // 要員の作成
      const member = await Member.create({
        name: '田中五郎',
        partnerId: partner.id,
        skills: 'React, TypeScript, Node.js',
        projectId: project.id,
        startDate: new Date('2023-03-01'),
        rate: 800000,
        status: '稼働中'
      });
      
      // 要員を取得し、関連するパートナー会社と案件も取得
      const foundMember = await Member.findByPk(member.id, {
        include: [
          { model: Partner },
          { model: Project }
        ]
      });
      
      // nullチェックを追加
      expect(foundMember).not.toBeNull();
      if (foundMember) {
        expect(foundMember).toHaveProperty('partner');
        expect(foundMember).toHaveProperty('project');
        expect(foundMember.partner.name).toBe('リレーションテスト株式会社');
        expect(foundMember.project.name).toBe('リレーションテストプロジェクト');
      }
    });
  });
});
