# パートナー要員管理システム - システム設計書

## 1. システム概要

パートナー要員管理システムは、パートナー会社の情報管理、案件管理、要員管理、応募管理などの機能を提供するシステムです。本システムにより、パートナー会社との取引や要員の配置を効率的に管理することができます。

## 2. システムアーキテクチャ

### 2.1 全体アーキテクチャ

本システムは、フロントエンド、バックエンド、データベースの3層アーキテクチャで構成されています。

- **フロントエンド**: React + TypeScript + Redux + Material-UI
- **バックエンド**: Node.js + Express + TypeScript
- **データベース**: PostgreSQL

### 2.2 技術スタック

#### フロントエンド
- React: UIコンポーネントライブラリ
- TypeScript: 型安全な開発のための言語
- Redux: 状態管理ライブラリ
- Material-UI: UIコンポーネントフレームワーク
- React Router: ルーティングライブラリ
- Axios: HTTPクライアント

#### バックエンド
- Node.js: サーバーサイドJavaScript実行環境
- Express: Webアプリケーションフレームワーク
- TypeScript: 型安全な開発のための言語
- Sequelize: ORMライブラリ
- JWT: 認証トークン
- bcrypt: パスワードハッシュ化

#### データベース
- PostgreSQL: リレーショナルデータベース

## 3. データベース設計

### 3.1 ER図

本システムのデータベースは以下のエンティティで構成されています：

- Users: システムユーザー
- Partners: パートナー会社
- Projects: 案件
- Members: 要員
- Applications: 応募

エンティティ間の関連：
- Partners - Members: 1対多（1つのパートナー会社に複数の要員）
- Projects - Members: 1対多（1つの案件に複数の要員）
- Partners - Applications: 1対多（1つのパートナー会社から複数の応募）
- Projects - Applications: 1対多（1つの案件に対して複数の応募）

### 3.2 テーブル定義

#### Users テーブル
- id: INTEGER (PK)
- username: VARCHAR(50) (UNIQUE)
- password: VARCHAR(100)
- fullName: VARCHAR(100)
- email: VARCHAR(100) (UNIQUE)
- role: VARCHAR(20)
- department: VARCHAR(50)
- isActive: BOOLEAN
- lastLogin: TIMESTAMP
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP

#### Partners テーブル
- id: INTEGER (PK)
- name: VARCHAR(100)
- address: VARCHAR(200)
- phone: VARCHAR(20)
- representative: VARCHAR(50)
- establishedDate: DATE
- employeeCount: INTEGER
- businessDescription: TEXT
- status: VARCHAR(20)
- creditCheckDate: DATE
- antiSocialCheckDate: DATE
- remarks: TEXT
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP

#### Projects テーブル
- id: INTEGER (PK)
- code: VARCHAR(20) (UNIQUE)
- name: VARCHAR(100)
- department: VARCHAR(50)
- manager: VARCHAR(50)
- startDate: DATE
- endDate: DATE
- description: TEXT
- requiredSkills: TEXT
- headcount: INTEGER
- status: VARCHAR(20)
- remarks: TEXT
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP

#### Members テーブル
- id: INTEGER (PK)
- name: VARCHAR(50)
- partnerId: INTEGER (FK)
- skills: TEXT
- projectId: INTEGER (FK)
- startDate: DATE
- endDate: DATE
- rate: INTEGER
- status: VARCHAR(20)
- remarks: TEXT
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP

#### Applications テーブル
- id: INTEGER (PK)
- applicantName: VARCHAR(50)
- partnerId: INTEGER (FK)
- skills: TEXT
- projectId: INTEGER (FK)
- appliedDate: DATE
- rate: INTEGER
- status: VARCHAR(20)
- remarks: TEXT
- createdAt: TIMESTAMP
- updatedAt: TIMESTAMP

## 4. 機能設計

### 4.1 ユーザー認証機能
- ログイン機能
- ユーザープロファイル取得機能
- 認証トークン管理

### 4.2 パートナー会社管理機能
- パートナー会社一覧表示
- パートナー会社詳細表示
- パートナー会社登録
- パートナー会社情報更新
- パートナー会社削除

### 4.3 案件管理機能
- 案件一覧表示
- 案件詳細表示
- 案件登録
- 案件情報更新
- 案件削除

### 4.4 要員管理機能
- 要員一覧表示
- 要員詳細表示
- 要員登録
- 要員情報更新
- 要員削除

### 4.5 応募管理機能
- 応募一覧表示
- 応募詳細表示
- 応募登録
- 応募情報更新
- 応募承認（要員として登録）
- 応募却下

## 5. API設計

### 5.1 認証API
- POST /api/auth/login: ログイン
- GET /api/auth/profile: ユーザープロファイル取得

### 5.2 パートナー会社API
- GET /api/partners: パートナー会社一覧取得
- GET /api/partners/:id: パートナー会社詳細取得
- POST /api/partners: パートナー会社登録
- PUT /api/partners/:id: パートナー会社情報更新
- DELETE /api/partners/:id: パートナー会社削除

### 5.3 案件API
- GET /api/projects: 案件一覧取得
- GET /api/projects/:id: 案件詳細取得
- POST /api/projects: 案件登録
- PUT /api/projects/:id: 案件情報更新
- DELETE /api/projects/:id: 案件削除

### 5.4 要員API
- GET /api/members: 要員一覧取得
- GET /api/members/:id: 要員詳細取得
- POST /api/members: 要員登録
- PUT /api/members/:id: 要員情報更新
- DELETE /api/members/:id: 要員削除

### 5.5 応募API
- GET /api/applications: 応募一覧取得
- GET /api/applications/:id: 応募詳細取得
- POST /api/applications: 応募登録
- PUT /api/applications/:id: 応募情報更新
- POST /api/applications/:id/approve: 応募承認
- POST /api/applications/:id/reject: 応募却下

## 6. 画面設計

### 6.1 ログイン画面
- ユーザー名入力フィールド
- パスワード入力フィールド
- ログインボタン

### 6.2 ダッシュボード画面
- 案件数、パートナー会社数、要員数などの概要情報
- 最近の応募情報
- ナビゲーションメニュー

### 6.3 パートナー会社一覧画面
- パートナー会社一覧表示（テーブル形式）
- 検索機能
- 新規登録ボタン

### 6.4 パートナー会社詳細画面
- パートナー会社情報表示
- 編集ボタン
- 削除ボタン
- 所属要員一覧

### 6.5 案件一覧画面
- 案件一覧表示（テーブル形式）
- 検索機能
- 新規登録ボタン

### 6.6 案件詳細画面
- 案件情報表示
- 編集ボタン
- 削除ボタン
- 配属要員一覧
- 応募一覧

### 6.7 要員一覧画面
- 要員一覧表示（テーブル形式）
- 検索機能
- 新規登録ボタン

### 6.8 要員詳細画面
- 要員情報表示
- 編集ボタン
- 削除ボタン
- 所属パートナー会社情報
- 配属案件情報

### 6.9 応募一覧画面
- 応募一覧表示（テーブル形式）
- 検索機能
- 新規登録ボタン

### 6.10 応募詳細画面
- 応募情報表示
- 編集ボタン
- 承認ボタン
- 却下ボタン
- パートナー会社情報
- 案件情報

## 7. セキュリティ設計

### 7.1 認証・認可
- JWTを使用したトークンベースの認証
- ロールベースのアクセス制御
- パスワードのハッシュ化（bcrypt）

### 7.2 通信セキュリティ
- HTTPS通信
- CORS設定

### 7.3 入力検証
- フロントエンドでのバリデーション
- バックエンドでのバリデーション

## 8. 今後の拡張計画

### 8.1 追加予定機能
- 信用調査/反社チェック管理機能
- 基本契約管理機能
- パートナー会社営業窓口管理機能
- 案件募集送信機能
- 個別契約管理機能
- 要員関連連絡・依頼（ワークフロー）機能
- 要員評価管理機能
- 通知機能
- レポート機能
- マスターデータ管理機能

### 8.2 パフォーマンス改善
- データベースインデックスの最適化
- キャッシュ機構の導入
- ページネーション機能の強化

## 9. テスト計画

### 9.1 ユニットテスト
- バックエンドAPI
- データベースモデル
- フロントエンドコンポーネント
- Reduxステート管理

### 9.2 統合テスト
- フロントエンドとバックエンドの連携
- エンドツーエンドのユーザーフロー

### 9.3 パフォーマンステスト
- 負荷テスト
- スケーラビリティテスト

## 10. 運用・保守計画

### 10.1 バックアップ計画
- データベースの定期バックアップ
- ソースコードのバージョン管理

### 10.2 監視計画
- サーバーリソースの監視
- エラーログの監視
- パフォーマンスの監視

### 10.3 アップデート計画
- セキュリティアップデート
- 機能追加・改善
- バグ修正
