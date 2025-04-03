# E2Eテスト導入調査レポート

## 1. E2Eテストとは

エンドツーエンド（E2E）テストは、アプリケーションの全体的な機能を実際のユーザーの視点からテストする手法です。ユーザーの操作を模倣し、フロントエンドからバックエンド、データベースまでの全てのレイヤーを通じてアプリケーションが正しく動作することを検証します。

## 2. 主要なE2Eテストツール

### Cypress
- **特徴**: モダンなJavaScript E2Eテストフレームワーク
- **メリット**:
  - ブラウザ内で直接実行され、高速
  - リアルタイムのリロードと優れたデバッグ機能
  - 直感的なAPIと豊富なドキュメント
  - 自動待機機能によりテストの安定性が高い
- **デメリット**:
  - 複数のブラウザタブのテストに制限あり
  - Chromiumベースのブラウザのみサポート（最近はFirefoxもサポート）

### Playwright
- **特徴**: Microsoftが開発した比較的新しいE2Eテストフレームワーク
- **メリット**:
  - 複数のブラウザ（Chromium, Firefox, WebKit）をサポート
  - 自動待機機能が強力
  - モバイルエミュレーションが優れている
  - TypeScriptのサポートが優れている
- **デメリット**:
  - 比較的新しいため、コミュニティやプラグインがCypressほど豊富でない

### Selenium
- **特徴**: 最も歴史のあるブラウザ自動化ツール
- **メリット**:
  - 多くの言語（Java, Python, C#, JavaScript等）をサポート
  - 幅広いブラウザをサポート
  - 大規模なコミュニティと豊富な情報
- **デメリット**:
  - セットアップが複雑
  - 実行速度が遅い
  - 安定性の問題が発生しやすい

## 3. パートナー要員管理システムへの導入推奨

### 推奨ツール: Cypress

パートナー要員管理システムのE2Eテストには**Cypress**が最適と考えられます。

**選定理由**:
1. React/TypeScriptプロジェクトとの親和性が高い
2. セットアップが容易で学習曲線が緩やか
3. テスト実行の視覚的フィードバックが優れている
4. 自動待機機能により非同期操作の多いSPAに適している
5. コンポーネントテストとE2Eテストの両方をサポート

## 4. 導入手順

### 4.1 インストール

```bash
cd partner_management_system/frontend
npm install --save-dev cypress
```

### 4.2 設定

package.jsonにスクリプトを追加:

```json
"scripts": {
  "cypress:open": "cypress open",
  "cypress:run": "cypress run"
}
```

### 4.3 基本的なテストシナリオ

以下のテストシナリオを実装することを推奨します:

1. **ログインフロー**
   - 正常なログイン
   - 不正なログイン
   - バリデーションエラー

2. **パートナー会社管理**
   - パートナー会社一覧の表示
   - パートナー会社の追加
   - パートナー会社の編集
   - パートナー会社の検索

3. **要員管理**
   - 要員一覧の表示
   - 要員の追加
   - 要員の編集
   - 要員の検索

4. **案件管理**
   - 案件一覧の表示
   - 案件の追加
   - 案件の編集
   - 案件の検索

## 5. サンプルテストコード

### ログインテストの例

```javascript
// cypress/e2e/login.cy.js
describe('ログイン機能', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('正しい認証情報でログインできる', () => {
    cy.get('#username').type('admin');
    cy.get('#password').type('password');
    cy.get('button[type="submit"]').click();
    
    // ダッシュボードにリダイレクトされることを確認
    cy.url().should('include', '/dashboard');
    cy.contains('ダッシュボード').should('be.visible');
  });

  it('誤った認証情報ではエラーメッセージが表示される', () => {
    cy.get('#username').type('wronguser');
    cy.get('#password').type('wrongpass');
    cy.get('button[type="submit"]').click();
    
    // エラーメッセージが表示されることを確認
    cy.contains('ユーザー名またはパスワードが正しくありません').should('be.visible');
    cy.url().should('not.include', '/dashboard');
  });

  it('空のフォームを送信するとバリデーションエラーが表示される', () => {
    cy.get('button[type="submit"]').click();
    
    // フォームが送信されないことを確認
    cy.url().should('not.include', '/dashboard');
  });
});
```

## 6. CI/CD統合

GitHubActionsでの自動テスト実行の設定例:

```yaml
name: E2E Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Start backend
        run: |
          cd backend
          npm ci
          npm start &
          sleep 10
      
      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          working-directory: frontend
          start: npm start
          wait-on: 'http://localhost:3000'
```

## 7. 導入コスト見積もり

- **開発工数**: 約3-5人日
  - Cypress導入と設定: 0.5人日
  - 基本テストシナリオ実装: 2-3人日
  - CI/CD統合: 0.5-1人日
  - ドキュメント作成: 0.5人日

- **メンテナンスコスト**:
  - UI変更時のテスト更新: 月0.5-1人日程度
  - 新機能追加時のテスト追加: 機能の複雑さによる

## 8. 結論と次のステップ

E2Eテストの導入により、パートナー要員管理システムの品質向上と回帰テストの効率化が期待できます。Cypressを使用することで、比較的少ない工数で効果的なテスト自動化が実現可能です。

**次のステップ**:
1. Cypressのインストールと基本設定
2. ログインフローのテスト実装
3. 主要機能のテストシナリオ実装
4. CI/CDパイプラインへの統合

以上の調査結果に基づき、E2Eテストの導入を推奨します。
