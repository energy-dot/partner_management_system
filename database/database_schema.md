# パートナー要員管理システム データベーススキーマ設計

## 1. ユーザー関連テーブル

### 1.1 users（ユーザーテーブル）
システムを利用するユーザー情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ユーザーID | PRIMARY KEY, AUTO INCREMENT |
| username | VARCHAR(50) | ログインID | UNIQUE, NOT NULL |
| password_hash | VARCHAR(255) | パスワードハッシュ | NOT NULL |
| full_name | VARCHAR(100) | 氏名 | NOT NULL |
| email | VARCHAR(100) | メールアドレス | UNIQUE, NOT NULL |
| department | VARCHAR(100) | 所属部署 | NOT NULL |
| position | VARCHAR(100) | 役職 | |
| phone | VARCHAR(20) | 電話番号 | |
| role_id | INTEGER | ロールID | FOREIGN KEY (roles.id), NOT NULL |
| is_active | BOOLEAN | アクティブ状態 | DEFAULT TRUE |
| last_login | TIMESTAMP | 最終ログイン日時 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 1.2 roles（ロールテーブル）
ユーザーの役割と権限を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ロールID | PRIMARY KEY, AUTO INCREMENT |
| name | VARCHAR(50) | ロール名 | UNIQUE, NOT NULL |
| description | TEXT | 説明 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 1.3 permissions（権限テーブル）
システム内の各機能に対する権限を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 権限ID | PRIMARY KEY, AUTO INCREMENT |
| name | VARCHAR(100) | 権限名 | UNIQUE, NOT NULL |
| description | TEXT | 説明 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 1.4 role_permissions（ロール権限中間テーブル）
ロールと権限の多対多の関連を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ID | PRIMARY KEY, AUTO INCREMENT |
| role_id | INTEGER | ロールID | FOREIGN KEY (roles.id), NOT NULL |
| permission_id | INTEGER | 権限ID | FOREIGN KEY (permissions.id), NOT NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |

## 2. パートナー会社関連テーブル

### 2.1 partner_companies（パートナー会社テーブル）
取引のあるパートナー会社の基本情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | パートナー会社ID | PRIMARY KEY, AUTO INCREMENT |
| name | VARCHAR(100) | 会社名 | NOT NULL |
| legal_number | VARCHAR(13) | 法人番号 | UNIQUE |
| address | TEXT | 本社所在地 | NOT NULL |
| phone | VARCHAR(20) | 電話番号 | NOT NULL |
| fax | VARCHAR(20) | FAX番号 | |
| website | VARCHAR(255) | WebサイトURL | |
| established_date | DATE | 設立年月日 | |
| capital | DECIMAL(15,2) | 資本金 | |
| employee_count | INTEGER | 従業員数 | |
| business_description | TEXT | 事業内容 | |
| main_bank | VARCHAR(100) | 主要取引銀行 | |
| representative | VARCHAR(100) | 代表者名 | |
| status | VARCHAR(20) | 会社ステータス | NOT NULL, DEFAULT '取引中' |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |
| deleted_at | TIMESTAMP | 削除日時（論理削除用） | NULL |

### 2.2 partner_company_files（パートナー会社関連ファイルテーブル）
パートナー会社に関連するファイルを管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ファイルID | PRIMARY KEY, AUTO INCREMENT |
| partner_company_id | INTEGER | パートナー会社ID | FOREIGN KEY (partner_companies.id), NOT NULL |
| file_name | VARCHAR(255) | ファイル名 | NOT NULL |
| file_path | VARCHAR(255) | ファイルパス | NOT NULL |
| file_type | VARCHAR(50) | ファイルタイプ | NOT NULL |
| description | TEXT | 説明 | |
| uploaded_by | INTEGER | アップロードしたユーザーID | FOREIGN KEY (users.id), NOT NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 2.3 compliance_checks（信用調査/反社チェックテーブル）
パートナー会社に対する信用調査や反社チェックの結果を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | チェックID | PRIMARY KEY, AUTO INCREMENT |
| partner_company_id | INTEGER | パートナー会社ID | FOREIGN KEY (partner_companies.id), NOT NULL |
| check_date | DATE | チェック実施日 | NOT NULL |
| checker_name | VARCHAR(100) | 実施者名 | NOT NULL |
| check_method | VARCHAR(100) | チェック方法 | |
| result | VARCHAR(20) | チェック結果 | NOT NULL |
| expiration_date | DATE | 有効期限 | |
| remarks | TEXT | 備考 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 2.4 compliance_check_files（信用調査/反社チェック関連ファイルテーブル）
信用調査や反社チェックに関連するファイルを管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ファイルID | PRIMARY KEY, AUTO INCREMENT |
| compliance_check_id | INTEGER | チェックID | FOREIGN KEY (compliance_checks.id), NOT NULL |
| file_name | VARCHAR(255) | ファイル名 | NOT NULL |
| file_path | VARCHAR(255) | ファイルパス | NOT NULL |
| file_type | VARCHAR(50) | ファイルタイプ | NOT NULL |
| description | TEXT | 説明 | |
| uploaded_by | INTEGER | アップロードしたユーザーID | FOREIGN KEY (users.id), NOT NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 2.5 basic_contracts（基本契約テーブル）
パートナー会社との基本契約情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 基本契約ID | PRIMARY KEY, AUTO INCREMENT |
| partner_company_id | INTEGER | パートナー会社ID | FOREIGN KEY (partner_companies.id), NOT NULL |
| contract_type | VARCHAR(50) | 契約種別 | NOT NULL |
| contract_number | VARCHAR(50) | 契約番号 | |
| signing_date | DATE | 契約締結日 | NOT NULL |
| start_date | DATE | 契約開始日 | NOT NULL |
| end_date | DATE | 契約終了日 | NOT NULL |
| auto_renewal | BOOLEAN | 自動更新の有無 | DEFAULT FALSE |
| status | VARCHAR(20) | 契約ステータス | NOT NULL |
| payment_terms | TEXT | 支払い条件 | |
| acceptance_criteria | TEXT | 検収条件 | |
| remarks | TEXT | 備考 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 2.6 basic_contract_files（基本契約関連ファイルテーブル）
基本契約に関連するファイルを管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ファイルID | PRIMARY KEY, AUTO INCREMENT |
| basic_contract_id | INTEGER | 基本契約ID | FOREIGN KEY (basic_contracts.id), NOT NULL |
| file_name | VARCHAR(255) | ファイル名 | NOT NULL |
| file_path | VARCHAR(255) | ファイルパス | NOT NULL |
| file_type | VARCHAR(50) | ファイルタイプ | NOT NULL |
| version | VARCHAR(20) | バージョン | |
| description | TEXT | 説明 | |
| uploaded_by | INTEGER | アップロードしたユーザーID | FOREIGN KEY (users.id), NOT NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 2.7 partner_contacts（パートナー会社営業窓口テーブル）
パートナー会社の営業担当者情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 窓口担当者ID | PRIMARY KEY, AUTO INCREMENT |
| partner_company_id | INTEGER | パートナー会社ID | FOREIGN KEY (partner_companies.id), NOT NULL |
| name | VARCHAR(100) | 氏名 | NOT NULL |
| department | VARCHAR(100) | 部署名 | |
| position | VARCHAR(100) | 役職 | |
| email | VARCHAR(100) | メールアドレス | NOT NULL |
| phone | VARCHAR(20) | 電話番号 | |
| contact_type | VARCHAR(20) | 担当区分 | |
| remarks | TEXT | 備考 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |
| deleted_at | TIMESTAMP | 削除日時（論理削除用） | NULL |

## 3. 案件関連テーブル

### 3.1 projects（案件テーブル）
パートナー会社の要員が必要となる案件情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 案件ID | PRIMARY KEY, AUTO INCREMENT |
| project_code | VARCHAR(50) | 案件コード | UNIQUE |
| name | VARCHAR(100) | 案件名 | NOT NULL |
| overview | TEXT | 案件概要 | NOT NULL |
| detail | TEXT | 作業内容詳細 | |
| department | VARCHAR(100) | 募集部署 | NOT NULL |
| team | VARCHAR(100) | 担当開発チーム/グループ名 | |
| manager_id | INTEGER | 案件担当者ID | FOREIGN KEY (users.id), NOT NULL |
| work_location | TEXT | 作業場所 | NOT NULL |
| remote_work | VARCHAR(20) | リモートワーク可否 | NOT NULL |
| office_days | VARCHAR(50) | 出社頻度 | |
| start_date | DATE | 予定期間_開始日 | NOT NULL |
| end_date | DATE | 予定期間_終了日 | NOT NULL |
| extension_possibility | VARCHAR(20) | 期間延長の可能性 | |
| required_skills | TEXT | 必須スキル | NOT NULL |
| preferred_skills | TEXT | 尚可スキル | |
| required_experience | TEXT | 必要経験年数 | |
| headcount | INTEGER | 募集人数 | NOT NULL |
| min_rate | DECIMAL(15,2) | 想定単価_下限 | |
| max_rate | DECIMAL(15,2) | 想定単価_上限 | |
| rate_type | VARCHAR(20) | 単金種別 | NOT NULL |
| contract_type | VARCHAR(20) | 契約形態 | NOT NULL |
| status | VARCHAR(20) | 案件ステータス | NOT NULL, DEFAULT '下書き' |
| recruitment_start_date | DATE | 募集開始日 | |
| recruitment_end_date | DATE | 募集締切日 | |
| priority | VARCHAR(10) | 案件重要度 | |
| remarks | TEXT | 備考、特記事項 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |
| approved_at | TIMESTAMP | 承認日時 | NULL |
| approved_by | INTEGER | 承認者ID | FOREIGN KEY (users.id), NULL |

### 3.2 project_skills（案件スキル中間テーブル）
案件と必要スキルの多対多の関連を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ID | PRIMARY KEY, AUTO INCREMENT |
| project_id | INTEGER | 案件ID | FOREIGN KEY (projects.id), NOT NULL |
| skill_id | INTEGER | スキルID | FOREIGN KEY (skills.id), NOT NULL |
| is_required | BOOLEAN | 必須スキルかどうか | DEFAULT TRUE |
| experience_years | INTEGER | 経験年数 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |

### 3.3 project_recruitment_emails（案件募集送信履歴テーブル）
案件募集のメール送信履歴を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 送信ID | PRIMARY KEY, AUTO INCREMENT |
| project_id | INTEGER | 案件ID | FOREIGN KEY (projects.id), NOT NULL |
| sender_id | INTEGER | 送信者ID | FOREIGN KEY (users.id), NOT NULL |
| email_subject | VARCHAR(255) | メール件名 | NOT NULL |
| email_body | TEXT | メール本文 | NOT NULL |
| sent_at | TIMESTAMP | 送信日時 | DEFAULT CURRENT_TIMESTAMP |
| recipient_type | VARCHAR(20) | 送信先タイプ（全社/グループ/個別） | NOT NULL |

### 3.4 project_recruitment_recipients（案件募集送信先テーブル）
案件募集のメール送信先を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ID | PRIMARY KEY, AUTO INCREMENT |
| email_id | INTEGER | 送信ID | FOREIGN KEY (project_recruitment_emails.id), NOT NULL |
| partner_company_id | INTEGER | パートナー会社ID | FOREIGN KEY (partner_companies.id), NULL |
| partner_contact_id | INTEGER | 窓口担当者ID | FOREIGN KEY (partner_contacts.id), NULL |
| email | VARCHAR(100) | 送信先メールアドレス | NOT NULL |
| is_opened | BOOLEAN | 開封されたか | DEFAULT FALSE |
| opened_at | TIMESTAMP | 開封日時 | NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |

## 4. 応募・要員関連テーブル

### 4.1 applications（応募テーブル）
案件への応募情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 応募ID | PRIMARY KEY, AUTO INCREMENT |
| project_id | INTEGER | 案件ID | FOREIGN KEY (projects.id), NOT NULL |
| partner_company_id | INTEGER | 応募パートナー会社ID | FOREIGN KEY (partner_companies.id), NOT NULL |
| partner_contact_id | INTEGER | 応募営業担当者ID | FOREIGN KEY (partner_contacts.id), NULL |
| applicant_name | VARCHAR(100) | 応募者氏名 | NOT NULL |
| age | INTEGER | 年齢 | |
| gender | VARCHAR(10) | 性別 | |
| nearest_station | VARCHAR(100) | 最寄り駅 | |
| proposed_rate | DECIMAL(15,2) | 希望単価 | |
| skill_summary | TEXT | スキル概要 | |
| application_date | TIMESTAMP | 応募日時 | DEFAULT CURRENT_TIMESTAMP |
| application_source | VARCHAR(50) | 応募経路 | |
| status | VARCHAR(20) | 選考ステータス | NOT NULL, DEFAULT '新規応募' |
| document_screener_id | INTEGER | 書類選考担当者ID | FOREIGN KEY (users.id), NULL |
| document_screening_comment | TEXT | 書類選考コメント | |
| final_result_date | DATE | 最終結果通知日 | NULL |
| remarks | TEXT | 備考 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.2 application_files（応募関連ファイルテーブル）
応募に関連するファイル（スキルシートなど）を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ファイルID | PRIMARY KEY, AUTO INCREMENT |
| application_id | INTEGER | 応募ID | FOREIGN KEY (applications.id), NOT NULL |
| file_name | VARCHAR(255) | ファイル名 | NOT NULL |
| file_path | VARCHAR(255) | ファイルパス | NOT NULL |
| file_type | VARCHAR(50) | ファイルタイプ | NOT NULL |
| version | VARCHAR(20) | バージョン | |
| description | TEXT | 説明 | |
| uploaded_by | INTEGER | アップロードしたユーザーID | FOREIGN KEY (users.id), NOT NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.3 interviews（面談記録テーブル）
応募者との面談記録を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 面談ID | PRIMARY KEY, AUTO INCREMENT |
| application_id | INTEGER | 応募ID | FOREIGN KEY (applications.id), NOT NULL |
| interview_date | TIMESTAMP | 面談日時 | NOT NULL |
| interviewer_id | INTEGER | 面談担当者ID | FOREIGN KEY (users.id), NOT NULL |
| interview_type | VARCHAR(20) | 面談形式（Web/対面） | NOT NULL |
| evaluation | VARCHAR(20) | 評価 | |
| comments | TEXT | 評価コメント | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.4 members（要員テーブル）
採用が決定し、プロジェクトにアサインされた要員の情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 要員ID | PRIMARY KEY, AUTO INCREMENT |
| application_id | INTEGER | 応募ID | FOREIGN KEY (applications.id), NULL |
| name | VARCHAR(100) | 氏名 | NOT NULL |
| partner_company_id | INTEGER | 所属パートナー会社ID | FOREIGN KEY (partner_companies.id), NOT NULL |
| age | INTEGER | 年齢 | |
| gender | VARCHAR(10) | 性別 | |
| nearest_station | VARCHAR(100) | 最寄り駅 | |
| email | VARCHAR(100) | メールアドレス | |
| phone | VARCHAR(20) | 電話番号 | |
| photo_path | VARCHAR(255) | 顔写真パス | |
| qualifications | TEXT | 保有資格 | |
| status | VARCHAR(20) | 要員ステータス | NOT NULL, DEFAULT '待機中' |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.5 member_skills（要員スキルテーブル）
要員の保有スキル情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ID | PRIMARY KEY, AUTO INCREMENT |
| member_id | INTEGER | 要員ID | FOREIGN KEY (members.id), NOT NULL |
| skill_id | INTEGER | スキルID | FOREIGN KEY (skills.id), NOT NULL |
| experience_years | DECIMAL(5,2) | 経験年数 | NOT NULL |
| level | VARCHAR(20) | レベル | |
| remarks | TEXT | 備考 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.6 member_files（要員関連ファイルテーブル）
要員に関連するファイル（スキルシートなど）を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ファイルID | PRIMARY KEY, AUTO INCREMENT |
| member_id | INTEGER | 要員ID | FOREIGN KEY (members.id), NOT NULL |
| file_name | VARCHAR(255) | ファイル名 | NOT NULL |
| file_path | VARCHAR(255) | ファイルパス | NOT NULL |
| file_type | VARCHAR(50) | ファイルタイプ | NOT NULL |
| version | VARCHAR(20) | バージョン | |
| description | TEXT | 説明 | |
| uploaded_by | INTEGER | アップロードしたユーザーID | FOREIGN KEY (users.id), NOT NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.7 individual_contracts（個別契約テーブル）
要員ごとの個別契約情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 個別契約ID | PRIMARY KEY, AUTO INCREMENT |
| member_id | INTEGER | 要員ID | FOREIGN KEY (members.id), NOT NULL |
| project_id | INTEGER | 案件ID | FOREIGN KEY (projects.id), NOT NULL |
| contract_type | VARCHAR(20) | 契約形態 | NOT NULL |
| rate | DECIMAL(15,2) | 契約単価 | NOT NULL |
| rate_type | VARCHAR(20) | 単金種別 | NOT NULL |
| currency | VARCHAR(3) | 通貨 | DEFAULT 'JPY' |
| tax_included | BOOLEAN | 税込かどうか | DEFAULT FALSE |
| payment_terms | VARCHAR(100) | 支払サイト | NOT NULL |
| start_date | DATE | 契約開始日 | NOT NULL |
| end_date | DATE | 契約終了日 | NOT NULL |
| status | VARCHAR(20) | 契約ステータス | NOT NULL, DEFAULT '契約中' |
| previous_contract_id | INTEGER | 契約更新前の契約ID | FOREIGN KEY (individual_contracts.id), NULL |
| remarks | TEXT | 備考 | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |
| approved_at | TIMESTAMP | 承認日時 | NULL |
| approved_by | INTEGER | 承認者ID | FOREIGN KEY (users.id), NULL |

### 4.8 contract_files（個別契約関連ファイルテーブル）
個別契約に関連するファイル（注文書、注文請書など）を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ファイルID | PRIMARY KEY, AUTO INCREMENT |
| individual_contract_id | INTEGER | 個別契約ID | FOREIGN KEY (individual_contracts.id), NOT NULL |
| file_name | VARCHAR(255) | ファイル名 | NOT NULL |
| file_path | VARCHAR(255) | ファイルパス | NOT NULL |
| file_type | VARCHAR(50) | ファイルタイプ | NOT NULL |
| file_category | VARCHAR(50) | ファイル区分（注文書/注文請書） | NOT NULL |
| version | VARCHAR(20) | バージョン | |
| description | TEXT | 説明 | |
| uploaded_by | INTEGER | アップロードしたユーザーID | FOREIGN KEY (users.id), NOT NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.9 member_requests（要員関連依頼テーブル）
要員に関する依頼（単価変更、契約終了、クレーム連絡など）を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 依頼ID | PRIMARY KEY, AUTO INCREMENT |
| request_type | VARCHAR(50) | 依頼種別 | NOT NULL |
| member_id | INTEGER | 対象要員ID | FOREIGN KEY (members.id), NOT NULL |
| individual_contract_id | INTEGER | 対象契約ID | FOREIGN KEY (individual_contracts.id), NULL |
| requester_id | INTEGER | 依頼者ID | FOREIGN KEY (users.id), NOT NULL |
| request_date | TIMESTAMP | 依頼日時 | DEFAULT CURRENT_TIMESTAMP |
| approver_id | INTEGER | 承認者ID | FOREIGN KEY (users.id), NULL |
| approval_date | TIMESTAMP | 承認/差し戻し日時 | NULL |
| status | VARCHAR(20) | 依頼ステータス | NOT NULL, DEFAULT '申請中' |
| request_details | TEXT | 依頼内容詳細 | NOT NULL |
| approval_comments | TEXT | 承認/差し戻しコメント | |
| new_rate | DECIMAL(15,2) | 変更後の希望単価 | NULL |
| rate_change_date | DATE | 単価変更希望日 | NULL |
| contract_end_date | DATE | 契約終了希望日 | NULL |
| issue_date | DATE | 問題発生日 | NULL |
| issue_details | TEXT | 問題詳細 | NULL |
| improvement_request | TEXT | 改善要求内容 | NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.10 member_evaluations（要員評価テーブル）
要員の評価情報を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 評価ID | PRIMARY KEY, AUTO INCREMENT |
| member_id | INTEGER | 要員ID | FOREIGN KEY (members.id), NOT NULL |
| project_id | INTEGER | 対象案件ID | FOREIGN KEY (projects.id), NOT NULL |
| start_date | DATE | 評価対象期間_開始日 | NOT NULL |
| end_date | DATE | 評価対象期間_終了日 | NOT NULL |
| evaluator_id | INTEGER | 評価者ID | FOREIGN KEY (users.id), NOT NULL |
| evaluation_date | DATE | 評価日 | NOT NULL |
| overall_comment | TEXT | 総合評価コメント | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.11 evaluation_items（評価項目テーブル）
要員評価で使用する評価項目を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 評価項目ID | PRIMARY KEY, AUTO INCREMENT |
| name | VARCHAR(100) | 評価項目名 | NOT NULL |
| description | TEXT | 説明 | |
| sort_order | INTEGER | 表示順 | NOT NULL |
| is_active | BOOLEAN | 有効/無効 | DEFAULT TRUE |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 4.12 evaluation_scores（評価スコアテーブル）
各評価項目に対するスコアを管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ID | PRIMARY KEY, AUTO INCREMENT |
| evaluation_id | INTEGER | 評価ID | FOREIGN KEY (member_evaluations.id), NOT NULL |
| evaluation_item_id | INTEGER | 評価項目ID | FOREIGN KEY (evaluation_items.id), NOT NULL |
| score | INTEGER | 評価スコア | NOT NULL |
| comment | TEXT | コメント | |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

## 5. マスターデータ・通知関連テーブル

### 5.1 skills（スキルマスターテーブル）
システムで使用するスキル項目を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | スキルID | PRIMARY KEY, AUTO INCREMENT |
| name | VARCHAR(100) | スキル名 | NOT NULL |
| category | VARCHAR(50) | カテゴリ | NOT NULL |
| subcategory | VARCHAR(50) | サブカテゴリ | |
| description | TEXT | 説明 | |
| sort_order | INTEGER | 表示順 | NOT NULL |
| is_active | BOOLEAN | 有効/無効 | DEFAULT TRUE |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 5.2 master_data（マスターデータテーブル）
システムで使用する各種区分値を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ID | PRIMARY KEY, AUTO INCREMENT |
| category | VARCHAR(50) | カテゴリ | NOT NULL |
| code | VARCHAR(50) | コード | NOT NULL |
| name | VARCHAR(100) | 名称 | NOT NULL |
| description | TEXT | 説明 | |
| sort_order | INTEGER | 表示順 | NOT NULL |
| is_active | BOOLEAN | 有効/無効 | DEFAULT TRUE |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 5.3 notifications（通知テーブル）
システム内の通知を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 通知ID | PRIMARY KEY, AUTO INCREMENT |
| user_id | INTEGER | 通知先ユーザーID | FOREIGN KEY (users.id), NOT NULL |
| title | VARCHAR(255) | 通知タイトル | NOT NULL |
| content | TEXT | 通知内容 | NOT NULL |
| notification_type | VARCHAR(50) | 通知種別 | NOT NULL |
| related_id | INTEGER | 関連ID | NULL |
| related_type | VARCHAR(50) | 関連タイプ | NULL |
| is_read | BOOLEAN | 既読フラグ | DEFAULT FALSE |
| read_at | TIMESTAMP | 既読日時 | NULL |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |

### 5.4 notification_templates（通知テンプレートテーブル）
通知で使用するテンプレートを管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | テンプレートID | PRIMARY KEY, AUTO INCREMENT |
| name | VARCHAR(100) | テンプレート名 | NOT NULL |
| notification_type | VARCHAR(50) | 通知種別 | NOT NULL |
| title_template | VARCHAR(255) | タイトルテンプレート | NOT NULL |
| content_template | TEXT | 内容テンプレート | NOT NULL |
| is_email | BOOLEAN | メール送信するか | DEFAULT FALSE |
| is_system | BOOLEAN | システム通知するか | DEFAULT TRUE |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

### 5.5 notification_settings（通知設定テーブル）
ユーザーごとの通知設定を管理するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 設定ID | PRIMARY KEY, AUTO INCREMENT |
| user_id | INTEGER | ユーザーID | FOREIGN KEY (users.id), NOT NULL |
| notification_type | VARCHAR(50) | 通知種別 | NOT NULL |
| is_email_enabled | BOOLEAN | メール通知を受け取るか | DEFAULT TRUE |
| is_system_enabled | BOOLEAN | システム通知を受け取るか | DEFAULT TRUE |
| created_at | TIMESTAMP | 作成日時 | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | 更新日時 | DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP |

## 6. システムログ関連テーブル

### 6.1 activity_logs（操作ログテーブル）
システム内の操作履歴を記録するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | ログID | PRIMARY KEY, AUTO INCREMENT |
| user_id | INTEGER | 操作ユーザーID | FOREIGN KEY (users.id), NULL |
| ip_address | VARCHAR(45) | IPアドレス | |
| action | VARCHAR(50) | 操作種別 | NOT NULL |
| target_type | VARCHAR(50) | 対象タイプ | NOT NULL |
| target_id | INTEGER | 対象ID | NULL |
| details | TEXT | 詳細情報（JSON形式） | |
| created_at | TIMESTAMP | 操作日時 | DEFAULT CURRENT_TIMESTAMP |

### 6.2 login_history（ログイン履歴テーブル）
ユーザーのログイン履歴を記録するテーブル

| カラム名 | データ型 | 説明 | 制約 |
|---------|---------|------|------|
| id | INTEGER | 履歴ID | PRIMARY KEY, AUTO INCREMENT |
| user_id | INTEGER | ユーザーID | FOREIGN KEY (users.id), NOT NULL |
| ip_address | VARCHAR(45) | IPアドレス | NOT NULL |
| user_agent | TEXT | ユーザーエージェント | |
| status | VARCHAR(20) | ステータス（成功/失敗） | NOT NULL |
| failure_reason | VARCHAR(100) | 失敗理由 | NULL |
| created_at | TIMESTAMP | ログイン試行日時 | DEFAULT CURRENT_TIMESTAMP |
