# パートナー要員管理システム API仕様書

## 概要
このドキュメントは、パートナー要員管理システムのバックエンドAPIの仕様を定義します。
APIはRESTfulな設計に基づいており、JSONフォーマットでデータをやり取りします。

## ベースURL
```
http://localhost:3001/api
```

## 認証
認証が必要なエンドポイントにアクセスする場合は、リクエストヘッダーに以下のようにJWTトークンを含める必要があります。

```
Authorization: Bearer {token}
```

トークンはログインAPIを通じて取得できます。

## エラーレスポンス
エラーが発生した場合、APIは適切なHTTPステータスコードと以下の形式のJSONレスポンスを返します。

```json
{
  "success": false,
  "message": "エラーメッセージ"
}
```

## API一覧

### 認証・ユーザー管理

#### ログイン
- **エンドポイント**: `POST /auth/login`
- **認証**: 不要
- **リクエスト本文**:
  ```json
  {
    "username": "ユーザー名",
    "password": "パスワード"
  }
  ```
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "message": "ログインに成功しました",
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "username": "ユーザー名",
      "fullName": "氏名",
      "email": "メールアドレス",
      "role": "ユーザーロール",
      "department": "部署"
    }
  }
  ```
- **エラーレスポンス**:
  - 400: 入力値が不正
  - 401: 認証失敗（ユーザー名/パスワードが正しくない、アカウントが無効）

#### ログアウト
- **エンドポイント**: `POST /auth/logout`
- **認証**: 必要
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "message": "ログアウトに成功しました"
  }
  ```

#### パスワード変更
- **エンドポイント**: `POST /auth/change-password`
- **認証**: 必要
- **リクエスト本文**:
  ```json
  {
    "currentPassword": "現在のパスワード",
    "newPassword": "新しいパスワード"
  }
  ```
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "message": "パスワードの変更に成功しました"
  }
  ```
- **エラーレスポンス**:
  - 400: 入力値が不正
  - 401: 現在のパスワードが正しくない
  - 404: ユーザーが見つからない

#### ユーザープロフィール取得
- **エンドポイント**: `GET /auth/profile`
- **認証**: 必要
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "user": {
      "id": 1,
      "username": "ユーザー名",
      "fullName": "氏名",
      "email": "メールアドレス",
      "role": "ユーザーロール",
      "department": "部署"
    }
  }
  ```
- **エラーレスポンス**:
  - 404: ユーザーが見つからない

### パートナー会社管理

#### パートナー会社一覧取得
- **エンドポイント**: `GET /partners`
- **認証**: 必要
- **クエリパラメータ**:
  - `page`: ページ番号（デフォルト: 1）
  - `limit`: 1ページあたりの件数（デフォルト: 10）
  - `search`: 検索キーワード
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "partners": [
      {
        "id": 1,
        "name": "会社名",
        "address": "住所",
        "contactPerson": "担当者名",
        "email": "メールアドレス",
        "phone": "電話番号",
        "status": "ステータス",
        "createdAt": "作成日時",
        "updatedAt": "更新日時"
      }
    ],
    "totalPages": 5,
    "currentPage": 1
  }
  ```

#### パートナー会社詳細取得
- **エンドポイント**: `GET /partners/:id`
- **認証**: 必要
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "partner": {
      "id": 1,
      "name": "会社名",
      "address": "住所",
      "contactPerson": "担当者名",
      "email": "メールアドレス",
      "phone": "電話番号",
      "status": "ステータス",
      "creditCheck": {
        "id": 1,
        "status": "ステータス",
        "checkDate": "調査日",
        "result": "結果",
        "notes": "備考"
      },
      "contracts": [
        {
          "id": 1,
          "type": "契約種別",
          "startDate": "開始日",
          "endDate": "終了日",
          "status": "ステータス"
        }
      ],
      "createdAt": "作成日時",
      "updatedAt": "更新日時"
    }
  }
  ```
- **エラーレスポンス**:
  - 404: パートナー会社が見つからない

#### パートナー会社登録
- **エンドポイント**: `POST /partners`
- **認証**: 必要
- **リクエスト本文**:
  ```json
  {
    "name": "会社名",
    "address": "住所",
    "contactPerson": "担当者名",
    "email": "メールアドレス",
    "phone": "電話番号"
  }
  ```
- **成功レスポンス** (201):
  ```json
  {
    "success": true,
    "message": "パートナー会社の登録に成功しました",
    "partner": {
      "id": 1,
      "name": "会社名",
      "address": "住所",
      "contactPerson": "担当者名",
      "email": "メールアドレス",
      "phone": "電話番号",
      "status": "pending",
      "createdAt": "作成日時",
      "updatedAt": "更新日時"
    }
  }
  ```
- **エラーレスポンス**:
  - 400: 入力値が不正

### 案件管理

#### 案件一覧取得
- **エンドポイント**: `GET /projects`
- **認証**: 必要
- **クエリパラメータ**:
  - `page`: ページ番号（デフォルト: 1）
  - `limit`: 1ページあたりの件数（デフォルト: 10）
  - `search`: 検索キーワード
  - `status`: ステータスでフィルタリング
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "projects": [
      {
        "id": 1,
        "name": "案件名",
        "description": "説明",
        "startDate": "開始日",
        "endDate": "終了日",
        "status": "ステータス",
        "department": "部署",
        "createdAt": "作成日時",
        "updatedAt": "更新日時"
      }
    ],
    "totalPages": 5,
    "currentPage": 1
  }
  ```

#### 案件詳細取得
- **エンドポイント**: `GET /projects/:id`
- **認証**: 必要
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "project": {
      "id": 1,
      "name": "案件名",
      "description": "説明",
      "startDate": "開始日",
      "endDate": "終了日",
      "status": "ステータス",
      "department": "部署",
      "requirements": "要件",
      "budget": "予算",
      "members": [
        {
          "id": 1,
          "name": "氏名",
          "role": "役割",
          "startDate": "開始日",
          "endDate": "終了日"
        }
      ],
      "invitations": [
        {
          "id": 1,
          "partnerId": 1,
          "partnerName": "パートナー会社名",
          "status": "ステータス",
          "sentDate": "送信日"
        }
      ],
      "createdAt": "作成日時",
      "updatedAt": "更新日時"
    }
  }
  ```
- **エラーレスポンス**:
  - 404: 案件が見つからない

### 要員管理

#### 要員一覧取得
- **エンドポイント**: `GET /members`
- **認証**: 必要
- **クエリパラメータ**:
  - `page`: ページ番号（デフォルト: 1）
  - `limit`: 1ページあたりの件数（デフォルト: 10）
  - `search`: 検索キーワード
  - `partnerId`: パートナー会社IDでフィルタリング
  - `projectId`: 案件IDでフィルタリング
  - `status`: ステータスでフィルタリング
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "members": [
      {
        "id": 1,
        "name": "氏名",
        "email": "メールアドレス",
        "phone": "電話番号",
        "skills": ["スキル1", "スキル2"],
        "partnerId": 1,
        "partnerName": "パートナー会社名",
        "status": "ステータス",
        "createdAt": "作成日時",
        "updatedAt": "更新日時"
      }
    ],
    "totalPages": 5,
    "currentPage": 1
  }
  ```

#### 要員詳細取得
- **エンドポイント**: `GET /members/:id`
- **認証**: 必要
- **成功レスポンス** (200):
  ```json
  {
    "success": true,
    "member": {
      "id": 1,
      "name": "氏名",
      "email": "メールアドレス",
      "phone": "電話番号",
      "skills": ["スキル1", "スキル2"],
      "experience": "経験年数",
      "partnerId": 1,
      "partnerName": "パートナー会社名",
      "status": "ステータス",
      "projects": [
        {
          "id": 1,
          "name": "案件名",
          "role": "役割",
          "startDate": "開始日",
          "endDate": "終了日"
        }
      ],
      "evaluations": [
        {
          "id": 1,
          "projectId": 1,
          "projectName": "案件名",
          "technicalScore": 4,
          "communicationScore": 5,
          "attitudeScore": 4,
          "comments": "コメント",
          "evaluationDate": "評価日"
        }
      ],
      "createdAt": "作成日時",
      "updatedAt": "更新日時"
    }
  }
  ```
- **エラーレスポンス**:
  - 404: 要員が見つからない

### 案件募集

#### 案件募集送信
- **エンドポイント**: `POST /project-invitations`
- **認証**: 必要
- **リクエスト本文**:
  ```json
  {
    "projectId": 1,
    "partnerIds": [1, 2, 3],
    "message": "募集メッセージ",
    "requiredSkills": ["スキル1", "スキル2"],
    "deadline": "応募締切日"
  }
  ```
- **成功レスポンス** (201):
  ```json
  {
    "success": true,
    "message": "案件募集の送信に成功しました",
    "invitations": [
      {
        "id": 1,
        "projectId": 1,
        "partnerId": 1,
        "status": "sent",
        "sentDate": "送信日"
      }
    ]
  }
  ```
- **エラーレスポンス**:
  - 400: 入力値が不正
  - 404: 案件またはパートナー会社が見つからない

#### 案件応募
- **エンドポイント**: `POST /applications`
- **認証**: 必要
- **リクエスト本文**:
  ```json
  {
    "invitationId": 1,
    "memberIds": [1, 2],
    "message": "応募メッセージ"
  }
  ```
- **成功レスポンス** (201):
  ```json
  {
    "success": true,
    "message": "案件応募の送信に成功しました",
    "application": {
      "id": 1,
      "invitationId": 1,
      "status": "pending",
      "members": [
        {
          "id": 1,
          "name": "氏名"
        }
      ],
      "submittedDate": "提出日"
    }
  }
  ```
- **エラーレスポンス**:
  - 400: 入力値が不正
  - 404: 募集または要員が見つからない

## ステータスコード
- 200: リクエスト成功
- 201: リソース作成成功
- 400: 不正なリクエスト
- 401: 認証エラー
- 403: 権限エラー
- 404: リソースが見つからない
- 500: サーバーエラー

## 認証エラーハンドリングの改善
認証エラーが発生した場合、一貫して401ステータスコードを返すように修正しました。これにより、クライアント側で適切なエラーハンドリングが可能になります。

## バージョン履歴
- v1.0.0 (2025-04-03): 初版作成
- v1.0.1 (2025-04-03): 認証エラーハンドリングの改善
