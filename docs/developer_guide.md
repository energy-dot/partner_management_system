# パートナー要員管理システム - 開発ガイド

## 1. 開発環境のセットアップ

### 1.1 必要なソフトウェア

- Node.js (v16以上)
- npm (v8以上)
- PostgreSQL (v14以上)
- Git

### 1.2 リポジトリのクローン

```bash
git clone https://github.com/your-organization/partner-management-system.git
cd partner-management-system
```

### 1.3 フロントエンドのセットアップ

```bash
cd frontend
npm install
```

### 1.4 バックエンドのセットアップ

```bash
cd backend
npm install
```

### 1.5 データベースのセットアップ

1. PostgreSQLにログインします。
```bash
psql -U postgres
```

2. データベースを作成します。
```sql
CREATE DATABASE partner_management;
```

3. `.env`ファイルを編集して、データベース接続情報を設定します。
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=partner_management
DB_USER=postgres
DB_PASSWORD=your_password
```

## 2. 開発サーバーの起動

### 2.1 バックエンドサーバーの起動

```bash
cd backend
npm run dev
```

バックエンドサーバーは`http://localhost:3001`で起動します。

### 2.2 フロントエンドサーバーの起動

```bash
cd frontend
npm run dev
```

フロントエンドサーバーは`http://localhost:3000`で起動します。

## 3. プロジェクト構造

### 3.1 フロントエンド構造

```
frontend/
├── public/            # 静的ファイル
├── src/               # ソースコード
│   ├── components/    # 再利用可能なコンポーネント
│   │   ├── common/    # 共通コンポーネント
│   │   └── ...
│   ├── features/      # 機能別のReduxスライス
│   │   ├── auth/      # 認証関連
│   │   └── ...
│   ├── layouts/       # レイアウトコンポーネント
│   ├── pages/         # ページコンポーネント
│   │   ├── partner/   # パートナー会社関連ページ
│   │   ├── project/   # 案件関連ページ
│   │   ├── member/    # 要員関連ページ
│   │   ├── application/ # 応募関連ページ
│   │   └── ...
│   ├── store/         # Reduxストア設定
│   ├── utils/         # ユーティリティ関数
│   ├── App.tsx        # アプリケーションのルートコンポーネント
│   └── main.tsx       # エントリーポイント
├── index.html         # HTMLテンプレート
├── package.json       # 依存関係と設定
├── tsconfig.json      # TypeScript設定
└── vite.config.ts     # Vite設定
```

### 3.2 バックエンド構造

```
backend/
├── src/               # ソースコード
│   ├── config/        # 設定ファイル
│   ├── controllers/   # コントローラー
│   ├── middleware/    # ミドルウェア
│   ├── models/        # データモデル
│   ├── routes/        # ルート定義
│   ├── services/      # ビジネスロジック
│   ├── utils/         # ユーティリティ関数
│   └── index.ts       # エントリーポイント
├── tests/             # テストファイル
├── .env               # 環境変数
├── package.json       # 依存関係と設定
└── tsconfig.json      # TypeScript設定
```

## 4. 開発ガイドライン

### 4.1 コーディング規約

- TypeScriptの型を適切に使用する
- コンポーネントはなるべく小さく保つ
- 関数型コンポーネントとHooksを使用する
- コメントを適切に記述する
- エラーハンドリングを適切に行う

### 4.2 コミット規約

コミットメッセージは以下の形式に従ってください：

```
<type>(<scope>): <subject>

<body>

<footer>
```

例：
```
feat(auth): ログイン機能の実装

- JWTを使用した認証機能を追加
- ログインフォームのバリデーションを追加

Closes #123
```

### 4.3 ブランチ戦略

- `main`: 本番環境用のブランチ
- `develop`: 開発環境用のブランチ
- `feature/<feature-name>`: 機能開発用のブランチ
- `bugfix/<bug-name>`: バグ修正用のブランチ
- `release/<version>`: リリース準備用のブランチ

## 5. テスト

### 5.1 テストの実行

#### フロントエンドテスト

```bash
cd frontend
npm test
```

#### バックエンドテスト

```bash
cd backend
npm test
```

### 5.2 テストカバレッジの確認

```bash
npm test -- --coverage
```

## 6. ビルドと展開

### 6.1 フロントエンドのビルド

```bash
cd frontend
npm run build
```

ビルドされたファイルは`dist`ディレクトリに出力されます。

### 6.2 バックエンドのビルド

```bash
cd backend
npm run build
```

ビルドされたファイルは`dist`ディレクトリに出力されます。

### 6.3 本番環境への展開

1. バックエンドのビルド
```bash
cd backend
npm run build
```

2. フロントエンドのビルド
```bash
cd frontend
npm run build
```

3. 本番環境での起動
```bash
cd backend
NODE_ENV=production npm start
```

## 7. トラブルシューティング

### 7.1 よくある問題と解決策

- **依存関係のエラー**: `npm install`を再実行してください。
- **TypeScriptのコンパイルエラー**: 型定義を確認してください。
- **APIエラー**: バックエンドのログを確認してください。
- **データベース接続エラー**: `.env`ファイルの設定を確認してください。

### 7.2 デバッグ方法

- フロントエンド: ブラウザの開発者ツールを使用してください。
- バックエンド: ログ出力を確認してください。

## 8. 拡張と貢献

### 8.1 新機能の追加方法

1. 新しいブランチを作成します。
```bash
git checkout -b feature/new-feature
```

2. 機能を実装します。

3. テストを作成し、実行します。

4. プルリクエストを作成します。

### 8.2 バグ報告

バグを発見した場合は、以下の情報を含めて報告してください：

- バグの詳細な説明
- 再現手順
- 期待される動作
- 実際の動作
- スクリーンショット（可能であれば）

## 9. API ドキュメント

APIの詳細なドキュメントは、バックエンドサーバーの`/api-docs`エンドポイントで確認できます。

## 10. ライセンス

このプロジェクトは[MITライセンス](LICENSE)の下で公開されています。
