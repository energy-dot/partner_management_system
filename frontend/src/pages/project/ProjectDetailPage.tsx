import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Button, 
  Tabs, 
  Tab, 
  CircularProgress,
  Divider,
  Chip
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// タブパネルのインターフェース
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// タブパネルコンポーネント
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// 案件詳細ページコンポーネント
const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  
  // 案件の仮データ
  const [project, setProject] = useState({
    id: id,
    code: 'PRJ-2023-001',
    name: 'ECサイトリニューアルプロジェクト',
    summary: '既存ECサイトのUI/UX改善および機能拡張',
    details: 'レスポンシブデザインへの対応、商品検索機能の強化、決済方法の追加、顧客管理システムとの連携強化など',
    department: '営業本部 デジタルマーケティング部',
    team: 'ECチーム',
    manager: '鈴木一郎',
    location: '東京都千代田区丸の内1-1-1',
    remoteWork: 'ハイブリッド',
    remoteFrequency: '週3日出社',
    startDate: '2023-07-01',
    endDate: '2023-12-31',
    extensionPossibility: 'あり',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    preferredSkills: ['Next.js', 'GraphQL', 'Docker'],
    requiredExperience: 'フロントエンド開発3年以上',
    headcount: 2,
    minRate: 750000,
    maxRate: 850000,
    rateType: '月額',
    contractType: '準委任',
    status: '募集中',
    recruitmentStartDate: '2023-05-15',
    recruitmentEndDate: '2023-06-15',
    priority: '高',
    notes: 'チーム内での円滑なコミュニケーションが求められます。アジャイル開発経験者歓迎。',
    createdAt: '2023-05-10',
    updatedAt: '2023-05-12',
    approvedAt: '2023-05-14'
  });

  // タブの切り替え処理
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // 戻るボタンの処理
  const handleBack = () => {
    navigate('/projects');
  };

  // データ取得の模擬処理
  useEffect(() => {
    // 実際のAPIからデータを取得する処理をここに実装
    // 今回はモックデータを使用
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        案件一覧に戻る
      </Button>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h1">
            {project.name}
          </Typography>
          <Chip 
            label={project.status} 
            color={project.status === '募集中' ? 'primary' : 'default'} 
            variant="outlined" 
          />
        </Box>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          案件コード: {project.code} / ID: {project.id}
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2">案件概要</Typography>
            <Typography paragraph>{project.summary}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">作業内容詳細</Typography>
            <Typography paragraph>{project.details}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">募集部署</Typography>
            <Typography paragraph>{project.department}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">担当チーム</Typography>
            <Typography paragraph>{project.team}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">案件担当者</Typography>
            <Typography paragraph>{project.manager}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">作業場所</Typography>
            <Typography paragraph>{project.location}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">リモートワーク</Typography>
            <Typography paragraph>{project.remoteWork}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">出社頻度</Typography>
            <Typography paragraph>{project.remoteFrequency}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">予定期間（開始）</Typography>
            <Typography paragraph>{project.startDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">予定期間（終了）</Typography>
            <Typography paragraph>{project.endDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">期間延長の可能性</Typography>
            <Typography paragraph>{project.extensionPossibility}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">必須スキル</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {project.requiredSkills.map((skill, index) => (
                <Chip key={index} label={skill} size="small" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">尚可スキル</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {project.preferredSkills.map((skill, index) => (
                <Chip key={index} label={skill} size="small" variant="outlined" />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">必要経験年数</Typography>
            <Typography paragraph>{project.requiredExperience}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">募集人数</Typography>
            <Typography paragraph>{project.headcount}名</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">想定単価（下限〜上限）</Typography>
            <Typography paragraph>
              {project.minRate.toLocaleString()}円 〜 {project.maxRate.toLocaleString()}円（{project.rateType}）
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">契約形態</Typography>
            <Typography paragraph>{project.contractType}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">募集開始日</Typography>
            <Typography paragraph>{project.recruitmentStartDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">募集締切日</Typography>
            <Typography paragraph>{project.recruitmentEndDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">案件重要度</Typography>
            <Typography paragraph>{project.priority}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">備考・特記事項</Typography>
            <Typography paragraph>{project.notes}</Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="project tabs">
            <Tab label="応募者一覧" />
            <Tab label="関連ファイル" />
            <Tab label="変更履歴" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>応募者一覧</Typography>
          <Typography paragraph>
            この案件に応募した要員の一覧が表示されます。現在、応募者はいません。
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>関連ファイル</Typography>
          <Typography paragraph>
            案件に関連するファイルが表示されます。現在、関連ファイルはありません。
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>変更履歴</Typography>
          <Typography paragraph>
            案件情報の変更履歴が表示されます。
          </Typography>
          <Box sx={{ pl: 2, borderLeft: '1px solid #e0e0e0' }}>
            <Typography variant="body2" color="text.secondary">
              2023-05-14: 案件が承認されました
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2023-05-12: 案件情報が更新されました
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2023-05-10: 案件が登録されました
            </Typography>
          </Box>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default ProjectDetailPage;
