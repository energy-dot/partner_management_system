import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// フロントエンドとバックエンドの連携テスト
describe('Frontend-Backend Integration Tests', () => {
  let mock;
  
  beforeEach(() => {
    // Axiosのモックを設定
    mock = new MockAdapter(axios);
  });
  
  afterEach(() => {
    // モックをリセット
    mock.reset();
  });
  
  // パートナー会社APIの連携テスト
  describe('Partner API Integration Tests', () => {
    test('パートナー会社一覧の取得', async () => {
      // モックデータ
      const mockPartners = [
        {
          id: 1,
          name: 'テスト株式会社',
          address: '東京都渋谷区1-1-1',
          phone: '03-1234-5678',
          representative: '山田太郎',
          establishedDate: '2000-01-01',
          employeeCount: 50,
          businessDescription: 'ITコンサルティング',
          status: '取引中'
        },
        {
          id: 2,
          name: 'サンプル株式会社',
          address: '東京都新宿区2-2-2',
          phone: '03-8765-4321',
          representative: '佐藤次郎',
          establishedDate: '2005-05-05',
          employeeCount: 30,
          businessDescription: 'システム開発',
          status: '取引中'
        }
      ];
      
      // APIレスポンスのモック
      mock.onGet('/api/partners').reply(200, {
        success: true,
        data: mockPartners
      });
      
      // APIリクエスト
      const response = await axios.get('/api/partners');
      
      // レスポンスの検証
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data).toHaveLength(2);
      expect(response.data.data[0].name).toBe('テスト株式会社');
      expect(response.data.data[1].name).toBe('サンプル株式会社');
    });
    
    test('パートナー会社の作成', async () => {
      // 新規パートナー会社データ
      const newPartner = {
        name: '新規株式会社',
        address: '東京都中央区3-3-3',
        phone: '03-3333-3333',
        representative: '鈴木三郎',
        establishedDate: '2010-10-10',
        employeeCount: 20,
        businessDescription: 'クラウドサービス',
        status: '候補'
      };
      
      // APIレスポンスのモック
      mock.onPost('/api/partners').reply(201, {
        success: true,
        message: 'パートナー会社を登録しました',
        data: { id: 3, ...newPartner }
      });
      
      // APIリクエスト
      const response = await axios.post('/api/partners', newPartner);
      
      // レスポンスの検証
      expect(response.status).toBe(201);
      expect(response.data.success).toBe(true);
      expect(response.data.data.id).toBe(3);
      expect(response.data.data.name).toBe('新規株式会社');
    });
  });
  
  // 案件APIの連携テスト
  describe('Project API Integration Tests', () => {
    test('案件一覧の取得', async () => {
      // モックデータ
      const mockProjects = [
        {
          id: 1,
          code: 'PRJ-001',
          name: 'テストプロジェクト',
          department: '開発部',
          manager: '佐藤次郎',
          startDate: '2023-01-01',
          endDate: '2023-12-31',
          description: 'Webアプリケーション開発',
          requiredSkills: 'React, Node.js, TypeScript',
          headcount: 3,
          status: '募集中'
        },
        {
          id: 2,
          code: 'PRJ-002',
          name: 'サンプルプロジェクト',
          department: '営業部',
          manager: '高橋四郎',
          startDate: '2023-04-01',
          endDate: '2023-09-30',
          description: 'モバイルアプリ開発',
          requiredSkills: 'React Native, TypeScript',
          headcount: 2,
          status: '募集中'
        }
      ];
      
      // APIレスポンスのモック
      mock.onGet('/api/projects').reply(200, {
        success: true,
        data: mockProjects
      });
      
      // APIリクエスト
      const response = await axios.get('/api/projects');
      
      // レスポンスの検証
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data).toHaveLength(2);
      expect(response.data.data[0].name).toBe('テストプロジェクト');
      expect(response.data.data[1].name).toBe('サンプルプロジェクト');
    });
  });
  
  // 要員APIの連携テスト
  describe('Member API Integration Tests', () => {
    test('要員一覧の取得', async () => {
      // モックデータ
      const mockMembers = [
        {
          id: 1,
          name: '田中五郎',
          partnerId: 1,
          Partner: { name: 'テスト株式会社' },
          skills: 'React, TypeScript, Node.js',
          projectId: 1,
          Project: { name: 'テストプロジェクト' },
          startDate: '2023-03-01',
          endDate: null,
          rate: 800000,
          status: '稼働中'
        },
        {
          id: 2,
          name: '伊藤六郎',
          partnerId: 2,
          Partner: { name: 'サンプル株式会社' },
          skills: 'Java, Spring Boot, MySQL',
          projectId: 2,
          Project: { name: 'サンプルプロジェクト' },
          startDate: '2023-05-01',
          endDate: null,
          rate: 750000,
          status: '稼働中'
        }
      ];
      
      // APIレスポンスのモック
      mock.onGet('/api/members').reply(200, {
        success: true,
        data: mockMembers
      });
      
      // APIリクエスト
      const response = await axios.get('/api/members');
      
      // レスポンスの検証
      expect(response.status).toBe(200);
      expect(response.data.success).toBe(true);
      expect(response.data.data).toHaveLength(2);
      expect(response.data.data[0].name).toBe('田中五郎');
      expect(response.data.data[0].Partner.name).toBe('テスト株式会社');
      expect(response.data.data[1].name).toBe('伊藤六郎');
      expect(response.data.data[1].Partner.name).toBe('サンプル株式会社');
    });
  });
});
