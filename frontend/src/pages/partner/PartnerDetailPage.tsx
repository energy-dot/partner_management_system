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
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// パートナー会社の型定義
interface Partner {
  id: string | undefined;
  name: string;
  legalNumber: string;
  address: string;
  phone: string;
  fax: string;
  website: string;
  foundedDate: string;
  capital: string;
  employees: string;
  business: string;
  bank: string;
  representative: string;
  status: string;
  registeredDate: string;
  updatedDate: string;
}

// タブパネルのインターフェース
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// タブパネルコンポーネント
function TabPanel(props: TabPanelProps): React.ReactElement {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`partner-tabpanel-${index}`}
      aria-labelledby={`partner-tab-${index}`}
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

// パートナー会社詳細ページコンポーネント
const PartnerDetailPage: React.FC = (): React.ReactElement => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [tabValue, setTabValue] = useState<number>(0);
  
  // パートナー会社の仮データ
  const [partner] = useState<Partner>({
    id: id,
    name: 'サンプルパートナー株式会社',
    legalNumber: '1234567890123',
    address: '東京都千代田区丸の内1-1-1',
    phone: '03-1234-5678',
    fax: '03-1234-5679',
    website: 'https://example.com',
    foundedDate: '2010-01-01',
    capital: '1000万円',
    employees: '50人',
    business: 'システム開発、ITコンサルティング',
    bank: '〇〇銀行',
    representative: '山田太郎',
    status: '取引中',
    registeredDate: '2022-01-01',
    updatedDate: '2023-01-01'
  });

  // タブの切り替え処理
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number): void => {
    setTabValue(newValue);
  };

  // 戻るボタンの処理
  const handleBack = (): void => {
    navigate('/partners');
  };

  // データ取得の模擬処理
  useEffect(() => {
    // 実際のAPIからデータを取得する処理をここに実装
    // 今回はモックデータを使用
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return (): void => clearTimeout(timer);
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
        パートナー一覧に戻る
      </Button>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {partner.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          ID: {partner.id}
        </Typography>
        <Divider sx={{ my: 2 }} />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">法人番号</Typography>
            <Typography paragraph>{partner.legalNumber}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">本社所在地</Typography>
            <Typography paragraph>{partner.address}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">電話番号</Typography>
            <Typography paragraph>{partner.phone}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">FAX番号</Typography>
            <Typography paragraph>{partner.fax}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">Webサイト</Typography>
            <Typography paragraph>{partner.website}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">設立年月日</Typography>
            <Typography paragraph>{partner.foundedDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">資本金</Typography>
            <Typography paragraph>{partner.capital}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">従業員数</Typography>
            <Typography paragraph>{partner.employees}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">事業内容</Typography>
            <Typography paragraph>{partner.business}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">主要取引銀行</Typography>
            <Typography paragraph>{partner.bank}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">代表者名</Typography>
            <Typography paragraph>{partner.representative}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2">会社ステータス</Typography>
            <Typography paragraph>{partner.status}</Typography>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="partner tabs">
            <Tab label="信用調査/反社チェック" />
            <Tab label="基本契約" />
            <Tab label="営業窓口" />
            <Tab label="関連ファイル" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom>信用調査/反社チェック情報</Typography>
          <Typography paragraph>
            この機能は現在実装中です。信用調査や反社会的勢力との関与に関するチェック結果を記録・管理します。
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom>基本契約情報</Typography>
          <Typography paragraph>
            この機能は現在実装中です。パートナー会社との間で締結される基本的な取引契約の情報を管理します。
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>営業窓口情報</Typography>
          <Typography paragraph>
            この機能は現在実装中です。パートナー会社の営業担当者など、自社との連絡窓口となる担当者の情報を管理します。
          </Typography>
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom>関連ファイル</Typography>
          <Typography paragraph>
            この機能は現在実装中です。会社案内、登記簿謄本などのファイルを管理します。
          </Typography>
        </TabPanel>
      </Box>
    </Box>
  );
};

export default PartnerDetailPage;
