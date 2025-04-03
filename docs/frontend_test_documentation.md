# フロントエンドテスト詳細ドキュメント

## 1. テスト環境概要

### 使用技術とライブラリ
- **Jest**: JavaScriptテストフレームワーク
- **React Testing Library**: Reactコンポーネントのテスト用ライブラリ
- **jest-dom**: DOMテスト用の拡張マッチャー
- **ts-jest**: TypeScriptサポート
- **axios-mock-adapter**: APIリクエストのモック
- **identity-obj-proxy**: CSSモジュールのモック

### 設定ファイル
- **jest.config.js**: Jestの設定
- **setupTests.ts**: テスト環境のセットアップ

## 2. テストファイル構成

現在のプロジェクトには以下のテストファイルが実装されています：

1. **LoginPage.test.tsx**
   - ログインページコンポーネントのテスト
   - フォーム入力と検証のテスト
   - ログイン処理のテスト

2. **authSlice.test.ts**
   - 認証関連のReduxスライスのテスト
   - ログインアクションのテスト
   - ログアウトアクションのテスト

3. **integration.test.ts**
   - フロントエンドとバックエンドの連携テスト
   - APIリクエストとレスポンスのテスト

## 3. テスト実行結果

### 現在の状況
テスト実行の結果、11個のテストのうち6個が成功し、5個が失敗しています。

#### 成功したテスト
- integration.test.ts内の4つのテスト
- authSlice.test.ts内の2つのテスト

#### 失敗したテスト
1. **LoginPage.test.tsx**:
   - `ログインフォームが正しくレンダリングされる`
   - `バリデーションが機能する`
   - `ログイン成功時にリダイレクトする`

2. **authSlice.test.ts**:
   - `ログイン失敗時にエラー状態が設定される`
   - `ログアウト時に認証状態がリセットされる`

### 失敗の原因
1. **インポートパスの問題**:
   - テストファイル内のインポートパスが正しくない
   - `../src/pages/LoginPage`のようなパスが`../pages/LoginPage`に修正が必要

2. **Reduxストアの問題**:
   - `Cannot read properties of undefined (reading 'getState')`エラー
   - テスト用のモックストアが正しく設定されていない

3. **TextEncoder/TextDecoderの問題**:
   - Node.js環境でTextEncoder/TextDecoderが定義されていない
   - setupTests.tsにポリフィルを追加して解決

## 4. 修正内容

### インポートパスの修正
```typescript
// 修正前
import LoginPage from '../src/pages/LoginPage';
import authReducer from '../src/features/auth/authSlice';

// 修正後
import LoginPage from '../pages/LoginPage';
import authReducer from '../features/auth/authSlice';
```

### TextEncoder/TextDecoderのポリフィル追加
```typescript
// setupTests.ts
if (typeof TextEncoder === 'undefined') {
  const util = require('util');
  global.TextEncoder = util.TextEncoder || TextEncoderPolyfill;
  global.TextDecoder = util.TextDecoder || TextDecoderPolyfill;
}
```

### テスト用モックストアの作成
```typescript
// テストユーティリティ
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

export const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      // 他の必要なリデューサー
    }
  });
};
```

## 5. 残存する問題と対応策

### 1. コンポーネントレンダリングの問題
- **問題**: LoginPageコンポーネントのレンダリングが失敗
- **原因**: 必要なプロバイダーやコンテキストが不足
- **対応策**: 
  - テスト用のラッパーコンポーネントを作成
  - 必要なプロバイダー（Redux, Router, Theme）を設定

```typescript
// テストユーティリティ
export const renderWithProviders = (
  ui,
  {
    store = createTestStore(),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
```

### 2. APIモックの問題
- **問題**: axios-mock-adapterの設定が不完全
- **原因**: モックの設定方法が不適切
- **対応策**:
  - APIリクエストのモック方法を改善
  - レスポンスデータの型を適切に設定

```typescript
// テストユーティリティ
export const setupApiMocks = () => {
  const mock = new MockAdapter(axios);
  
  // ログインAPIのモック
  mock.onPost('/api/auth/login').reply((config) => {
    const { username, password } = JSON.parse(config.data);
    
    if (username === 'testuser' && password === 'password') {
      return [200, {
        success: true,
        token: 'test-token',
        user: { id: 1, username: 'testuser' }
      }];
    }
    
    return [401, {
      success: false,
      message: '認証に失敗しました'
    }];
  });
  
  return mock;
};
```

## 6. テストカバレッジ向上計画

現在のテストカバレッジは限定的です。以下のコンポーネントとロジックに対するテストを追加することで、カバレッジを向上させる計画です：

### コンポーネントテスト
1. **ナビゲーションメニュー**
   - メニュー項目の表示
   - アクティブ項目のハイライト
   - 権限に基づく表示制御

2. **データテーブル**
   - データの表示
   - ソート機能
   - ページネーション
   - フィルタリング

3. **フォームコンポーネント**
   - 入力検証
   - 送信処理
   - エラー表示

### ロジックテスト
1. **Reduxスライス**
   - パートナー会社管理
   - 案件管理
   - 要員管理

2. **ユーティリティ関数**
   - 日付フォーマット
   - バリデーション
   - データ変換

## 7. 自動テスト導入計画

テスト自動化を強化するために、以下の導入を計画しています：

1. **テストカバレッジレポート**
   - Jestのカバレッジレポート機能を有効化
   - カバレッジ目標の設定（80%以上）

2. **CI/CDパイプラインへの統合**
   - プルリクエスト時の自動テスト実行
   - カバレッジレポートの自動生成

3. **E2Eテスト導入**
   - Cypressを使用したE2Eテスト
   - 主要ユーザーフローのテスト自動化

## 8. 推奨事項

1. **テストファーストアプローチの採用**
   - 新機能開発前にテストを作成
   - TDD（テスト駆動開発）の導入検討

2. **テストドキュメントの整備**
   - テスト方針の文書化
   - テストケースの管理

3. **定期的なテスト実行の習慣化**
   - 開発中の定期的なテスト実行
   - リグレッションテストの自動化

4. **モックデータの整備**
   - テスト用データの標準化
   - テストフィクスチャの作成

## 9. まとめ

フロントエンドテストの現状分析と改善計画を通じて、以下の点が明らかになりました：

1. 基本的なテスト環境は整備されているが、設定の修正が必要
2. テストファイルのインポートパスやモック設定に問題がある
3. テストカバレッジの向上が必要
4. テスト自動化の強化が推奨される

これらの問題に対処することで、フロントエンドの品質向上と安定したリリースが可能になります。
