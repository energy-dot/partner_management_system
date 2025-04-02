# パートナー要員管理システム システムアーキテクチャ設計書

## 1. 全体アーキテクチャ

### 1.1 アーキテクチャ概要

本システムは、モダンなウェブアプリケーションとして、以下の3層アーキテクチャを採用します：

1. **プレゼンテーション層（フロントエンド）**：
   - ユーザーインターフェースを提供するクライアントサイドのアプリケーション
   - シングルページアプリケーション（SPA）として実装

2. **アプリケーション層（バックエンド）**：
   - ビジネスロジックを実装するAPIサーバー
   - RESTful APIを提供し、フロントエンドとデータベース間の通信を仲介

3. **データ層（データベース）**：
   - データの永続化を担当
   - リレーショナルデータベースを使用

### 1.2 システム構成図

```
┌─────────────────────────────────────────────────────────────────┐
│                      クライアント（ブラウザ）                      │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     フロントエンドアプリケーション                  │
│                         (React + TypeScript)                    │
└───────────────────────────────┬─────────────────────────────────┘
                                │ HTTP/HTTPS
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      バックエンドAPIサーバー                      │
│                         (Node.js + Express)                     │
└───────────────────────────────┬─────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                           データベース                           │
│                            (MySQL)                              │
└─────────────────────────────────────────────────────────────────┘
```

### 1.3 デプロイメント構成

本システムは、以下のデプロイメント構成を想定しています：

- **開発環境**：
  - ローカル開発環境（開発者のPC）
  - 統合開発環境（共有サーバー）

- **テスト環境**：
  - QA/テスト用の専用環境

- **本番環境**：
  - 高可用性を確保した本番サーバー
  - ロードバランサーを使用した水平スケーリング対応

```
┌─────────────────────────────────────────────────────────────────┐
│                         本番環境                                │
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │ Webサーバー  │     │ APIサーバー  │     │ データベース │       │
│  │ (Nginx)     │────▶│ (Node.js)   │────▶│ (MySQL)     │       │
│  └─────────────┘     └─────────────┘     └─────────────┘       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 2. フロントエンド設計

### 2.1 技術スタック

フロントエンドは以下の技術スタックを採用します：

- **フレームワーク**：React
- **言語**：TypeScript
- **状態管理**：Redux Toolkit
- **ルーティング**：React Router
- **UIライブラリ**：Material-UI
- **フォーム管理**：React Hook Form
- **APIクライアント**：Axios
- **テスト**：Jest, React Testing Library
- **ビルドツール**：Vite

### 2.2 ディレクトリ構造

```
frontend/
├── public/                 # 静的ファイル
├── src/
│   ├── assets/             # 画像、フォントなどの静的リソース
│   ├── components/         # 再利用可能なコンポーネント
│   │   ├── common/         # 共通コンポーネント
│   │   ├── dashboard/      # ダッシュボード関連コンポーネント
│   │   ├── partner/        # パートナー会社関連コンポーネント
│   │   ├── project/        # 案件関連コンポーネント
│   │   ├── member/         # 要員関連コンポーネント
│   │   └── ...
│   ├── features/           # 機能モジュール（Redux Sliceを含む）
│   │   ├── auth/           # 認証関連
│   │   ├── dashboard/      # ダッシュボード関連
│   │   ├── partner/        # パートナー会社関連
│   │   ├── project/        # 案件関連
│   │   ├── member/         # 要員関連
│   │   └── ...
│   ├── hooks/              # カスタムフック
│   ├── layouts/            # レイアウトコンポーネント
│   ├── pages/              # ページコンポーネント
│   ├── routes/             # ルーティング設定
│   ├── services/           # APIサービス
│   ├── store/              # Reduxストア設定
│   ├── types/              # TypeScript型定義
│   ├── utils/              # ユーティリティ関数
│   ├── App.tsx             # アプリケーションのルートコンポーネント
│   ├── main.tsx            # エントリーポイント
│   └── vite-env.d.ts       # Vite環境変数の型定義
├── .eslintrc.js            # ESLint設定
├── .prettierrc             # Prettier設定
├── index.html              # HTMLテンプレート
├── package.json            # 依存関係とスクリプト
├── tsconfig.json           # TypeScript設定
└── vite.config.ts          # Vite設定
```

### 2.3 コンポーネント設計

コンポーネントは以下の原則に基づいて設計します：

1. **単一責任の原則**：各コンポーネントは1つの責任のみを持つ
2. **再利用性**：共通のUIパターンは再利用可能なコンポーネントとして実装
3. **コンポジション**：小さなコンポーネントを組み合わせて複雑なUIを構築
4. **プレゼンテーショナルとコンテナの分離**：UIとロジックを分離

### 2.4 状態管理

Redux Toolkitを使用して、以下のような状態を管理します：

1. **グローバル状態**：
   - ユーザー認証情報
   - アプリケーション全体の設定
   - グローバル通知

2. **ドメイン状態**：
   - パートナー会社データ
   - 案件データ
   - 要員データ
   - その他の業務データ

3. **UI状態**：
   - フォームの状態
   - モーダルの表示/非表示
   - ローディング状態

### 2.5 ルーティング設計

React Routerを使用して、以下のようなルート構造を実装します：

```
/                           # ホーム/ダッシュボード
/login                      # ログイン
/dashboard                  # ダッシュボード

/partners                   # パートナー会社一覧
/partners/new               # パートナー会社新規登録
/partners/:id               # パートナー会社詳細
/partners/:id/edit          # パートナー会社編集
/partners/:id/contacts      # パートナー会社営業窓口一覧
/partners/:id/compliance    # 信用調査/反社チェック一覧
/partners/:id/contracts     # 基本契約一覧

/projects                   # 案件一覧
/projects/new               # 案件新規登録
/projects/:id               # 案件詳細
/projects/:id/edit          # 案件編集
/projects/:id/applications  # 応募一覧

/applications               # 応募一覧（全案件）
/applications/:id           # 応募詳細
/applications/:id/interviews # 面談記録

/members                    # 要員一覧
/members/new                # 要員新規登録
/members/:id                # 要員詳細
/members/:id/edit           # 要員編集
/members/:id/contracts      # 個別契約一覧
/members/:id/evaluations    # 評価一覧
/members/:id/requests       # 依頼一覧

/requests                   # 依頼一覧
/requests/new               # 依頼新規登録
/requests/:id               # 依頼詳細

/reports                    # レポート一覧
/reports/:type              # 特定タイプのレポート

/settings                   # 設定
/settings/profile           # プロフィール設定
/settings/notifications     # 通知設定
/settings/master-data       # マスターデータ管理
/settings/users             # ユーザー管理
```

### 2.6 認証・認可

フロントエンドでの認証・認可は以下のように実装します：

1. **認証**：
   - JWTトークンベースの認証
   - ログイン状態の永続化（localStorage）
   - トークンの自動更新

2. **認可**：
   - ユーザーロールに基づくルートガード
   - コンポーネントレベルでの権限チェック
   - APIリクエストへの認証トークン付与

## 3. バックエンド設計

### 3.1 技術スタック

バックエンドは以下の技術スタックを採用します：

- **プラットフォーム**：Node.js
- **フレームワーク**：Express.js
- **言語**：TypeScript
- **ORM**：Sequelize
- **認証**：JWT (JSON Web Token)
- **バリデーション**：Joi
- **ロギング**：Winston
- **テスト**：Jest, Supertest
- **ドキュメント**：Swagger/OpenAPI

### 3.2 ディレクトリ構造

```
backend/
├── src/
│   ├── config/             # 設定ファイル
│   ├── controllers/        # コントローラー
│   ├── middlewares/        # ミドルウェア
│   ├── models/             # データモデル
│   ├── routes/             # ルート定義
│   ├── services/           # ビジネスロジック
│   ├── utils/              # ユーティリティ関数
│   ├── validators/         # バリデーションスキーマ
│   ├── app.ts              # Expressアプリケーション設定
│   └── server.ts           # サーバー起動スクリプト
├── tests/                  # テストファイル
├── .env.example            # 環境変数のサンプル
├── .eslintrc.js            # ESLint設定
├── .prettierrc             # Prettier設定
├── jest.config.js          # Jest設定
├── package.json            # 依存関係とスクリプト
├── tsconfig.json           # TypeScript設定
└── nodemon.json            # Nodemon設定
```

### 3.3 アーキテクチャパターン

バックエンドは以下のレイヤードアーキテクチャを採用します：

1. **ルーティング層**：
   - HTTPリクエストのルーティング
   - リクエストパラメータの基本的な検証

2. **コントローラー層**：
   - リクエスト処理の調整
   - レスポンスの整形
   - 入力バリデーション

3. **サービス層**：
   - ビジネスロジックの実装
   - トランザクション管理
   - 複数のモデル間の連携

4. **モデル層**：
   - データアクセスロジック
   - データベーススキーマ定義
   - データの検証

### 3.4 API設計

RESTful APIの原則に従い、以下のようなエンドポイント構造を設計します：

```
# 認証
POST   /api/auth/login              # ログイン
POST   /api/auth/logout             # ログアウト
POST   /api/auth/refresh-token      # トークン更新
GET    /api/auth/me                 # 現在のユーザー情報取得

# ユーザー管理
GET    /api/users                   # ユーザー一覧取得
POST   /api/users                   # ユーザー作成
GET    /api/users/:id               # ユーザー詳細取得
PUT    /api/users/:id               # ユーザー更新
DELETE /api/users/:id               # ユーザー削除
PUT    /api/users/:id/password      # パスワード変更

# パートナー会社
GET    /api/partners                # パートナー会社一覧取得
POST   /api/partners                # パートナー会社作成
GET    /api/partners/:id            # パートナー会社詳細取得
PUT    /api/partners/:id            # パートナー会社更新
DELETE /api/partners/:id            # パートナー会社削除（論理削除）

# パートナー会社ファイル
POST   /api/partners/:id/files      # ファイルアップロード
GET    /api/partners/:id/files      # ファイル一覧取得
GET    /api/partners/files/:fileId  # ファイル取得
DELETE /api/partners/files/:fileId  # ファイル削除

# 信用調査/反社チェック
GET    /api/partners/:id/compliance-checks     # チェック一覧取得
POST   /api/partners/:id/compliance-checks     # チェック作成
GET    /api/compliance-checks/:id              # チェック詳細取得
PUT    /api/compliance-checks/:id              # チェック更新
DELETE /api/compliance-checks/:id              # チェック削除

# 基本契約
GET    /api/partners/:id/contracts             # 契約一覧取得
POST   /api/partners/:id/contracts             # 契約作成
GET    /api/basic-contracts/:id                # 契約詳細取得
PUT    /api/basic-contracts/:id                # 契約更新
DELETE /api/basic-contracts/:id                # 契約削除

# パートナー会社営業窓口
GET    /api/partners/:id/contacts              # 窓口一覧取得
POST   /api/partners/:id/contacts              # 窓口作成
GET    /api/partner-contacts/:id               # 窓口詳細取得
PUT    /api/partner-contacts/:id               # 窓口更新
DELETE /api/partner-contacts/:id               # 窓口削除（論理削除）

# 案件
GET    /api/projects                           # 案件一覧取得
POST   /api/projects                           # 案件作成
GET    /api/projects/:id                       # 案件詳細取得
PUT    /api/projects/:id                       # 案件更新
DELETE /api/projects/:id                       # 案件削除（論理削除）
PUT    /api/projects/:id/status                # 案件ステータス更新
POST   /api/projects/:id/approve               # 案件承認
POST   /api/projects/:id/reject                # 案件差し戻し

# 案件募集送信
POST   /api/projects/:id/recruitment-emails    # 募集メール送信
GET    /api/projects/:id/recruitment-emails    # 送信履歴取得

# 応募
GET    /api/applications                       # 応募一覧取得
GET    /api/projects/:id/applications          # 案件別応募一覧取得
POST   /api/projects/:id/applications          # 応募作成
GET    /api/applications/:id                   # 応募詳細取得
PUT    /api/applications/:id                   # 応募更新
PUT    /api/applications/:id/status            # 選考ステータス更新

# 面談
GET    /api/applications/:id/interviews        # 面談一覧取得
POST   /api/applications/:id/interviews        # 面談記録作成
GET    /api/interviews/:id                     # 面談詳細取得
PUT    /api/interviews/:id                     # 面談更新
DELETE /api/interviews/:id                     # 面談削除

# 要員
GET    /api/members                            # 要員一覧取得
POST   /api/members                            # 要員作成
GET    /api/members/:id                        # 要員詳細取得
PUT    /api/members/:id                        # 要員更新
PUT    /api/members/:id/status                 # 要員ステータス更新

# 要員スキル
GET    /api/members/:id/skills                 # スキル一覧取得
POST   /api/members/:id/skills                 # スキル追加
PUT    /api/member-skills/:id                  # スキル更新
DELETE /api/member-skills/:id                  # スキル削除

# 個別契約
GET    /api/members/:id/contracts              # 契約一覧取得
POST   /api/members/:id/contracts              # 契約作成
GET    /api/individual-contracts/:id           # 契約詳細取得
PUT    /api/individual-contracts/:id           # 契約更新
PUT    /api/individual-contracts/:id/status    # 契約ステータス更新

# 要員関連依頼
GET    /api/requests                           # 依頼一覧取得
POST   /api/requests                           # 依頼作成
GET    /api/requests/:id                       # 依頼詳細取得
PUT    /api/requests/:id                       # 依頼更新
PUT    /api/requests/:id/status                # 依頼ステータス更新
POST   /api/requests/:id/approve               # 依頼承認
POST   /api/requests/:id/reject                # 依頼差し戻し

# 要員評価
GET    /api/members/:id/evaluations            # 評価一覧取得
POST   /api/members/:id/evaluations            # 評価作成
GET    /api/evaluations/:id                    # 評価詳細取得
PUT    /api/evaluations/:id                    # 評価更新
DELETE /api/evaluations/:id                    # 評価削除

# 通知
GET    /api/notifications                      # 通知一覧取得
PUT    /api/notifications/:id/read             # 通知既読設定
PUT    /api/notifications/read-all             # 全通知既読設定

# 通知設定
GET    /api/notification-settings              # 通知設定取得
PUT    /api/notification-settings              # 通知設定更新

# レポート
GET    /api/reports                            # レポート一覧取得
GET    /api/reports/:type                      # 特定タイプのレポート生成

# マスターデータ
GET    /api/master/skills                      # スキル一覧取得
POST   /api/master/skills                      # スキル作成
PUT    /api/master/skills/:id                  # スキル更新
DELETE /api/master/skills/:id                  # スキル削除

GET    /api/master/:category                   # カテゴリ別マスターデータ取得
POST   /api/master/:category                   # マスターデータ作成
PUT    /api/master/:category/:id               # マスターデータ更新
DELETE /api/master/:category/:id               # マスターデータ削除
```

### 3.5 認証・認可

バックエンドでの認証・認可は以下のように実装します：

1. **認証**：
   - JWTトークンを使用した認証
   - アクセストークンとリフレッシュトークンの発行
   - パスワードのハッシュ化（bcrypt）

2. **認可**：
   - ロールベースのアクセス制御（RBAC）
   - ミドルウェアによる権限チェック
   - リソースオーナーシップの検証

### 3.6 エラーハンドリング

統一的なエラーハンドリングを実装し、以下のようなレスポンス形式を採用します：

```json
// 成功レスポンス
{
  "success": true,
  "data": { ... },
  "message": "操作が成功しました"
}

// エラーレスポンス
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "入力データが不正です",
    "details": [ ... ]
  }
}
```

エラーコードは以下のようなカテゴリに分類します：

- `AUTH_ERROR`: 認証関連のエラー
- `VALIDATION_ERROR`: 入力バリデーションエラー
- `RESOURCE_ERROR`: リソースが見つからないなどのエラー
- `PERMISSION_ERROR`: 権限不足によるエラー
- `SERVER_ERROR`: サーバー内部エラー

### 3.7 ロギング

以下のようなログレベルを設定し、適切なログ出力を行います：

- `ERROR`: アプリケーションエラー（例外）
- `WARN`: 警告（潜在的な問題）
- `INFO`: 一般的な情報（リクエスト、重要なイベント）
- `DEBUG`: デバッグ情報（開発時のみ）

ログには以下の情報を含めます：

- タイムスタンプ
- ログレベル
- リクエストID（トレーサビリティのため）
- ユーザーID（認証済みの場合）
- メッセージ
- 追加のコンテキスト情報

## 4. データベース設計

### 4.1 技術選定

データベースには以下の技術を採用します：

- **RDBMS**: MySQL 8.0
- **ORM**: Sequelize

### 4.2 マイグレーション戦略

データベースのスキーマ変更は、マイグレーションファイルを使用して管理します：

- 各マイグレーションファイルには、変更内容（up）と元に戻す方法（down）を記述
- マイグレーションの実行履歴をデータベースに記録
- 環境ごとにマイグレーションを適用

### 4.3 シードデータ

初期データとして以下のようなシードデータを用意します：

- 管理者ユーザー
- 基本的なロールと権限
- マスターデータ（スキル、各種区分値など）

## 5. セキュリティ設計

### 5.1 認証・認可

前述の認証・認可の仕組みに加えて、以下のセキュリティ対策を実装します：

- **パスワードポリシー**：
  - 最低8文字以上
  - 英大文字、英小文字、数字、特殊文字を含む
  - 定期的な変更を促す（90日ごと）
  - 過去に使用したパスワードの再利用禁止

- **アカウントロック**：
  - 連続5回のログイン失敗でアカウントを一時的にロック（30分間）

- **セッション管理**：
  - アイドル状態が30分続くと自動ログアウト
  - 同一アカウントの同時ログインを制限（オプション）

### 5.2 通信セキュリティ

- **HTTPS**：
  - 全ての通信をHTTPS（TLS 1.2以上）で暗号化
  - HTTP Strict Transport Security（HSTS）の適用

- **APIセキュリティ**：
  - CORS（Cross-Origin Resource Sharing）の適切な設定
  - CSP（Content Security Policy）の実装
  - レートリミットの適用（DoS攻撃対策）

### 5.3 データセキュリティ

- **機密データの暗号化**：
  - パスワードはbcryptでハッシュ化
  - 特に機密性の高い個人情報は暗号化して保存

- **データアクセス制御**：
  - 最小権限の原則に基づくアクセス制御
  - 監査ログの記録

### 5.4 脆弱性対策

- **入力バリデーション**：
  - 全てのユーザー入力を適切にバリデーション
  - SQLインジェクション対策（パラメータ化クエリの使用）
  - XSS対策（出力エスケープ、CSP）

- **セキュリティヘッダー**：
  - X-Content-Type-Options
  - X-Frame-Options
  - X-XSS-Protection
  - Referrer-Policy

- **依存パッケージの脆弱性管理**：
  - 定期的な脆弱性スキャン
  - 依存パッケージの更新

## 6. 非機能要件対応

### 6.1 パフォーマンス

- **フロントエンド**：
  - コードスプリッティング
  - 画像の最適化
  - キャッシュ戦略

- **バックエンド**：
  - クエリの最適化
  - インデックスの適切な設定
  - キャッシュの活用（Redis）

- **データベース**：
  - インデックス設計
  - クエリチューニング
  - コネクションプーリング

### 6.2 スケーラビリティ

- **水平スケーリング**：
  - ステートレスなAPIサーバー設計
  - ロードバランサーの使用

- **垂直スケーリング**：
  - リソース（CPU、メモリ）の増強に対応した設計

### 6.3 可用性

- **冗長構成**：
  - 複数のサーバーインスタンス
  - データベースのレプリケーション

- **障害検知と復旧**：
  - ヘルスチェック
  - 自動復旧メカニズム

### 6.4 保守性

- **モジュール化**：
  - 疎結合な設計
  - 責務の明確な分離

- **テスト自動化**：
  - ユニットテスト
  - 統合テスト
  - E2Eテスト

- **CI/CD**：
  - 継続的インテグレーション
  - 継続的デリバリー

### 6.5 監視・運用

- **アプリケーション監視**：
  - パフォーマンスメトリクス
  - エラー監視
  - ユーザー行動分析

- **インフラ監視**：
  - サーバーリソース（CPU、メモリ、ディスク）
  - ネットワーク
  - データベース

- **アラート**：
  - 閾値ベースのアラート
  - 異常検知

## 7. 開発・運用プロセス

### 7.1 開発環境

- **ローカル開発環境**：
  - Docker Compose
  - 開発用データベース
  - 開発サーバー（ホットリロード対応）

- **バージョン管理**：
  - Git
  - ブランチ戦略（Git Flow）
  - プルリクエストレビュー

### 7.2 テスト戦略

- **テストレベル**：
  - ユニットテスト
  - 統合テスト
  - E2Eテスト
  - パフォーマンステスト

- **テスト自動化**：
  - CI/CDパイプラインでの自動テスト
  - テストカバレッジの測定

### 7.3 デプロイメント

- **環境**：
  - 開発環境
  - テスト環境
  - ステージング環境
  - 本番環境

- **デプロイプロセス**：
  - ビルド
  - テスト
  - デプロイ
  - 検証

### 7.4 バックアップと復旧

- **バックアップ戦略**：
  - 定期的なフルバックアップ
  - 差分バックアップ
  - トランザクションログのバックアップ

- **復旧手順**：
  - 障害発生時の復旧手順
  - 復旧テスト

## 8. 今後の拡張性

### 8.1 将来的な機能拡張

- **請求管理システムとの連携**：
  - 契約情報と連携した請求書発行
  - 支払い管理

- **電子契約サービスとの連携**：
  - 契約書の電子署名
  - 契約プロセスの完全デジタル化

- **BI/分析機能の強化**：
  - 高度なデータ分析
  - ダッシュボードのカスタマイズ

### 8.2 技術的な拡張性

- **マイクロサービス化**：
  - 機能ごとの分割
  - サービス間通信の設計

- **APIゲートウェイ**：
  - 認証・認可の一元管理
  - レートリミット
  - キャッシュ

- **イベント駆動アーキテクチャ**：
  - メッセージキュー
  - 非同期処理
