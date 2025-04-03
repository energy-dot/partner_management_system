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
  Chip,
  Avatar
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
      id={`member-tabpanel-${index}`}
      aria-labelledby={`member-tab-${index}`}
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

// 要員詳細ページコンポーネント
const MemberDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  
  // 要員の仮データ
  const [member, setMember] = useState({
    id: id,
    name: '山田 太郎',
    nameKana: 'ヤマダ タロウ',
    partnerId: 'PTN-001',
    partnerName: 'サンプルパートナー株式会社',
    birthDate: '1985-07-15',
    gender: '男性',
    email: 'yamada.taro@example.com',
    phone: '090-1234-5678',
    address: '東京都新宿区新宿1-1-1',
    skills: [
      { name: 'Java', years: 8, level: '上級' },
      { name: 'Spring Boot', years: 5, level: '中級' },
      { name: 'React', years: 3, level: '中級' },
      { name: 'AWS', years: 4, level: '中級' },
      { name: 'Docker', years: 2, level: '初級' }
    ],
    certifications: [
      { name: 'Oracle Certified Java Programmer', acquiredDate: '2018-05-20' },
      { name: 'AWS Certified Solutions Architect', acquiredDate: '2020-11-15' }
    ],
    projectHistory: [
      { 
        projectName: '大手ECサイトリニューアル', 
        role: 'バックエンド開発リーダー',
        period: '2021-04-01 〜 2022-03-31',
        description: 'Java/Spring Bootを使用したAPIの設計・開発、チームマネジメント'
      },
      { 
        projectName: '金融機関向け顧客管理システム', 
        role: 'フルスタックエンジニア',
        period: '2020-01-01 〜 2021-03-31',
        description: 'バックエンド（Java）およびフロントエンド（React）の開発'
      }
    ],
    status: '稼働中',
    currentProject: 'ECサイトリニューアルプロジェクト',
    currentRate: 800000,
    rateUnit: '月額',
    contractType: '準委任',
    startDate: '2023-01-10',
    endDate: '2023-12-31',
    notes: 'コミュニケーション能力が高く、チーム内での調整業務も得意。英語でのドキュメント読解可能。',
    createdAt: '2022-12-15',
    updatedAt: '2023-03-20'
  });

  // タブの切り替え処理
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // 戻るボタンの処理
  const handleBack = () => {
    navigate('/members');
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
        要員一覧に戻る
      </Button>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ width: 64, height: 64, mr: 2, bgcolor: 'primary.main' }}
          >
            {member.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" component="h1">
              {member.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {member.nameKana}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Chip 
              label={member.status} 
              color={member.status === '稼働中' ? 'success' : 'default'} 
              variant="outlined" 
            />
          </Box>
        </Box>
        <Typography variant="subtitle1" gutterBottom>
          所属: <Button size="small" onClick={() => navigate(`/partners/${member.partnerId}`)}>{member.partnerName}</Button>
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">生年月日</Typography>
            <Typography paragraph>{member.birthDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">性別</Typography>
            <Typography paragraph>{member.gender}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">メールアドレス</Typography>
            <Typography paragraph>{member.email}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">電話番号</Typography>
            <Typography paragraph>{member.phone}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">住所</Typography>
            <Typography paragraph>{member.address}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">現在のプロジェクト</Typography>
            <Typography paragraph>{member.currentProject || '未アサイン'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">単価</Typography>
            <Typography paragraph>{member.currentRate.toLocaleString()}円（{member.rateUnit}）</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">契約形態</Typography>
            <Typography paragraph>{member.contractType}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">契約期間</Typography>
            <Typography paragraph>{member.startDate} 〜 {member.endDate}</Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="member tabs">
            <Tab label="スキル・資格" />
            <Tab label="プロジェクト履歴" />
            <Tab label="契約履歴" />
            <Tab label="評価履歴" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>スキル</Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {member.skills.map((skill, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1">{skill.name}</Typography>
                  <Typography variant="body2">経験: {skill.years}年</Typography>
                  <Typography variant="body2">レベル: {skill.level}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
          <Typography variant="h6" gutterBottom>保有資格</Typography>
          <Grid container spacing={2}>
            {member.certifications.map((cert, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1">{cert.name}</Typography>
                  <Typography variant="body2">取得日: {cert.acquiredDate}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>プロジェクト履歴</Typography>
          {member.projectHistory.map((project, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1">{project.projectName}</Typography>
              <Typography variant="body2">役割: {project.role}</Typography>
              <Typography variant="body2">期間: {project.period}</Typography>
              <Typography variant="body2">内容: {project.description}</Typography>
            </Paper>
          ))}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>契約履歴</Typography>
          <Typography paragraph>
            この機能は現在実装中です。要員との契約履歴を管理します。
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>評価履歴</Typography>
          <Typography paragraph>
            この機能は現在実装中です。プロジェクト終了後の要員評価を管理します。
          </Typography>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default MemberDetailPage;
