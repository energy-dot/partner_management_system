# パートナー要員管理システム 環境ガイド

## 目次
1. [現環境での使い方](#1-現環境での使い方)
   1. [システム起動方法](#11-システム起動方法)
   2. [バックエンド起動](#12-バックエンド起動)
   3. [フロントエンド起動](#13-フロントエンド起動)
   4. [テスト実行方法](#14-テスト実行方法)
   5. [開発作業の進め方](#15-開発作業の進め方)
2. [別環境での構築方法](#2-別環境での構築方法)
   1. [前提条件](#21-前提条件)
   2. [リポジトリのクローン](#22-リポジトリのクローン)
   3. [データベースのセットアップ](#23-データベースのセットアップ)
   4. [バックエンドの構築](#24-バックエンドの構築)
   5. [フロントエンドの構築](#25-フロントエンドの構築)
   6. [システム全体の起動](#26-システム全体の起動)
   7. [本番環境へのデプロイ](#27-本番環境へのデプロイ)
3. [トラブルシューティング](#3-トラブルシューティング)

## 1. 現環境での使い方

### 1.1 システム起動方法

現在の環境（サンドボックス環境）でパートナー要員管理システムを起動するには、バックエンドとフロントエンドの両方を起動する必要があります。

#### 全体の構成

```
partner_management_system/
├── backend/         # Node.js/Expressバックエンド
├── frontend/        # React/TypeScriptフロントエンド
├── database/        # データベース関連ファイル
└── docs/            # ドキュメント
```

### 1.2 バックエンド起動

バックエンドを起動するには、以下のコマンドを実行します：

```bash
# ターミナル1で実行
cd /home/ubuntu/partner_management_system/backend
npm run dev
```

これにより、バックエンドサーバーがポート5000で起動します。正常に起動すると、以下のようなメッセージが表示されます：

```
Server running on port 5000
Connected to PostgreSQL database
```

### 1.3 フロントエンド起動

フロントエンドを起動するには、別のターミナルで以下のコマンドを実行します：

```bash
# ターミナル2で実行
cd /home/ubuntu/partner_management_system/frontend
npm run dev
```

これにより、フロントエンド開発サーバーがポート3000で起動します。正常に起動すると、以下のようなメッセージが表示されます：

```
  VITE v6.2.4  ready in 405 ms
  ➜  Local:   http://localhost:3000/
  ➜  Network: http://169.254.0.21:3000/
```

### 1.4 テスト実行方法

#### バックエンドテストの実行

```bash
cd /home/ubuntu/partner_management_system/backend
npm test
```

#### フロントエンドテストの実行

```bash
cd /home/ubuntu/partner_management_system/frontend
npm test
```

#### テストカバレッジの確認

```bash
cd /home/ubuntu/partner_management_system/frontend
npm test -- --coverage
```

### 1.5 開発作業の進め方

1. **コード変更**：
   - バックエンドコードは `/home/ubuntu/partner_management_system/backend/src` ディレクトリ
   - フロントエンドコードは `/home/ubuntu/partner_management_system/frontend/src` ディレクトリ

2. **変更の確認**：
   - 開発サーバーは変更を自動的に検出し、リロードします
   - ブラウザで `http://localhost:3000` にアクセスして変更を確認

3. **APIテスト**：
   - バックエンドAPIは `http://localhost:5000/api` でアクセス可能
   - 例：`http://localhost:5000/api/auth/login` (ログインAPI)

4. **ログイン情報**：
   - 開発用アカウント: `admin` / `password`

## 2. 別環境での構築方法

### 2.1 前提条件

別環境でパートナー要員管理システムを構築するには、以下のソフトウェアが必要です：

- Node.js (v16以上)
- npm (v8以上)
- PostgreSQL (v14以上)
- Git

#### Ubuntu/Debian環境での前提条件インストール

```bash
# Node.jsとnpmのインストール
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQLのインストール
sudo apt-get update
sudo apt-get install -y postgresql postgresql-contrib

# Gitのインストール
sudo apt-get install -y git
```

#### macOS環境での前提条件インストール

```bash
# Homebrewがインストールされていない場合
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.jsとnpmのインストール
brew install node@16

# PostgreSQLのインストール
brew install postgresql@14
brew services start postgresql@14

# Gitのインストール
brew install git
```

#### Windows環境での前提条件インストール

1. **Node.js**: [Node.js公式サイト](https://nodejs.org/)からインストーラーをダウンロードしてインストール
2. **PostgreSQL**: [PostgreSQL公式サイト](https://www.postgresql.org/download/windows/)からインストーラーをダウンロードしてインストール
3. **Git**: [Git公式サイト](https://git-scm.com/download/win)からインストーラーをダウンロードしてインストール

### 2.2 リポジトリのクローン

```bash
# プロジェクトを配置したいディレクトリに移動
cd /path/to/your/projects

# リポジトリをクローン
git clone https://github.com/energy-dot/partner_management_system.git

# プロジェクトディレクトリに移動
cd partner_management_system
```

### 2.3 データベースのセットアップ

#### PostgreSQLデータベースの作成

```bash
# PostgreSQLにログイン
sudo -u postgres psql

# データベースを作成
CREATE DATABASE partner_management;

# ユーザーを作成（既に存在する場合はスキップ）
CREATE USER postgres WITH ENCRYPTED PASSWORD 'postgres';

# 権限を付与
GRANT ALL PRIVILEGES ON DATABASE partner_management TO postgres;

# PostgreSQLを終了
\q
```

#### データベース接続設定

バックエンドの環境設定ファイルを作成します：

```bash
cd /path/to/your/projects/partner_management_system/backend

# .envファイルを作成
cat > .env << EOL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=partner_management
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_key
PORT=5000
EOL
```

### 2.4 バックエンドの構築

```bash
# バックエンドディレクトリに移動
cd /path/to/your/projects/partner_management_system/backend

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

正常に起動すると、以下のようなメッセージが表示されます：

```
Server running on port 5000
Connected to PostgreSQL database
```

### 2.5 フロントエンドの構築

```bash
# フロントエンドディレクトリに移動
cd /path/to/your/projects/partner_management_system/frontend

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

正常に起動すると、以下のようなメッセージが表示されます：

```
  VITE v6.2.4  ready in 405 ms
  ➜  Local:   http://localhost:3000/
```

これで、ブラウザで `http://localhost:3000` にアクセスすると、パートナー要員管理システムのログイン画面が表示されます。

### 2.6 システム全体の起動

本番環境や開発環境で常時システムを稼働させるには、以下の手順を実行します。

#### PM2を使用した永続的な実行（推奨）

```bash
# PM2のグローバルインストール
npm install -g pm2

# バックエンドの起動
cd /path/to/your/projects/partner_management_system/backend
pm2 start npm --name "partner-backend" -- run start

# フロントエンドのビルドと起動
cd /path/to/your/projects/partner_management_system/frontend
npm run build
pm2 start npm --name "partner-frontend" -- run preview

# PM2の起動設定を保存
pm2 save

# システム起動時に自動的に開始するように設定
pm2 startup
```

### 2.7 本番環境へのデプロイ

#### バックエンドのデプロイ

```bash
# バックエンドディレクトリに移動
cd /path/to/your/projects/partner_management_system/backend

# 本番用の依存関係のみインストール
npm ci --production

# 本番環境用の環境変数設定
cat > .env << EOL
DB_HOST=your_production_db_host
DB_PORT=5432
DB_NAME=partner_management
DB_USER=your_production_db_user
DB_PASSWORD=your_production_db_password
JWT_SECRET=your_production_jwt_secret
PORT=5000
NODE_ENV=production
EOL

# PM2で起動
pm2 start npm --name "partner-backend-prod" -- run start
```

#### フロントエンドのデプロイ

```bash
# フロントエンドディレクトリに移動
cd /path/to/your/projects/partner_management_system/frontend

# 本番用ビルド
npm ci
npm run build

# 静的ファイルをWebサーバーにデプロイ
# 例：Nginxを使用する場合
sudo cp -r dist/* /var/www/html/partner-management/
```

#### Nginxの設定例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html/partner-management;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 3. トラブルシューティング

### データベース接続エラー

**症状**: バックエンドサーバー起動時に「Could not connect to PostgreSQL database」というエラーが表示される

**解決策**:
1. PostgreSQLサービスが実行中か確認
   ```bash
   sudo service postgresql status
   ```

2. データベース接続情報が正しいか確認
   ```bash
   cat /path/to/your/projects/partner_management_system/backend/.env
   ```

3. PostgreSQLユーザーのパスワードをリセット
   ```bash
   sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
   ```

### ポートが既に使用されている

**症状**: 「Port 5000 is already in use」または「Port 3000 is already in use」というエラーが表示される

**解決策**:
1. 使用中のプロセスを確認
   ```bash
   sudo lsof -i :5000   # バックエンドポート
   sudo lsof -i :3000   # フロントエンドポート
   ```

2. プロセスを終了
   ```bash
   sudo kill -9 <PID>   # <PID>は上記コマンドで表示されたプロセスID
   ```

3. 別のポートを使用するように設定を変更
   - バックエンド: `.env`ファイルの`PORT`を変更
   - フロントエンド: `vite.config.ts`ファイルの`server.port`を変更

### 依存関係のエラー

**症状**: `npm install`実行時に依存関係のエラーが表示される

**解決策**:
1. npmキャッシュをクリア
   ```bash
   npm cache clean --force
   ```

2. node_modulesディレクトリを削除して再インストール
   ```bash
   rm -rf node_modules
   npm install
   ```

3. Node.jsとnpmのバージョンを確認
   ```bash
   node -v
   npm -v
   ```
   
   必要に応じてバージョンをアップデート

### フロントエンドからバックエンドへの接続エラー

**症状**: フロントエンドからAPIにアクセスできない

**解決策**:
1. バックエンドが実行中か確認
   ```bash
   curl http://localhost:5000/api/health
   ```

2. CORSの設定を確認
   - バックエンドの`src/app.js`または`src/config/cors.js`でCORS設定を確認

3. フロントエンドの環境変数を確認
   - `.env`または`.env.local`ファイルでAPIのベースURLが正しく設定されているか確認
