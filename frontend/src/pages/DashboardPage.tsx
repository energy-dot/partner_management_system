import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  LinearProgress
} from '@mui/material';
import { useAppSelector } from '../store';
import BusinessIcon from '@mui/icons-material/Business';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PeopleIcon from '@mui/icons-material/People';
import WarningIcon from '@mui/icons-material/Warning';

const DashboardPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  
  // 開発用のモックデータ
  const kpiData = {
    partnerCount: 42,
    activeProjectCount: 15,
    activeMemberCount: 78,
    pendingApplicationCount: 23
  };
  
  const pendingTasks = [
    { id: 1, title: '案件「クラウド移行プロジェクト」の承認待ち', date: '2025-04-01', status: '承認待ち' },
    { id: 2, title: '要員「山田太郎」の単価変更依頼', date: '2025-04-02', status: '承認待ち' },
    { id: 3, title: '「データ分析基盤構築」案件への新規応募（3件）', date: '2025-04-02', status: '未対応' }
  ];
  
  const expiringContracts = [
    { id: 1, name: '鈴木一郎', company: '株式会社テクノソリューション', project: 'ECサイト開発', endDate: '2025-04-30' },
    { id: 2, name: '佐藤健太', company: '株式会社ITエキスパート', project: 'クラウド移行プロジェクト', endDate: '2025-05-15' },
    { id: 3, name: '田中花子', company: '株式会社デジタルイノベーション', project: 'モバイルアプリ開発', endDate: '2025-05-20' }
  ];
  
  const projectStatus = [
    { id: 1, name: 'ECサイト開発', applicants: 12, hired: 5, required: 8, status: '募集中' },
    { id: 2, name: 'クラウド移行プロジェクト', applicants: 8, hired: 3, required: 5, status: '募集中' },
    { id: 3, name: 'データ分析基盤構築', applicants: 15, hired: 6, required: 6, status: '充足' }
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        ダッシュボード
      </Typography>
      
      <Typography variant="subtitle1" gutterBottom>
        こんにちは、{user?.fullName || 'ユーザー'}さん
      </Typography>
      
      {/* KPI概要 */}
      <Grid container spacing={3} sx={{ mt: 1, mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'primary.light', color: 'white' }}>
            <BusinessIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{kpiData.partnerCount}</Typography>
            <Typography variant="body2">パートナー会社数</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'secondary.light', color: 'white' }}>
            <AssignmentIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{kpiData.activeProjectCount}</Typography>
            <Typography variant="body2">募集中案件数</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'success.light', color: 'white' }}>
            <PeopleIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{kpiData.activeMemberCount}</Typography>
            <Typography variant="body2">稼働中要員数</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'warning.light', color: 'white' }}>
            <WarningIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4">{kpiData.pendingApplicationCount}</Typography>
            <Typography variant="body2">未対応応募数</Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Grid container spacing={3}>
        {/* 対応待ちタスク */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="対応待ちタスク" />
            <CardContent>
              <List>
                {pendingTasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={task.title}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {task.date}
                            </Typography>
                            <Chip 
                              label={task.status} 
                              size="small" 
                              color={task.status === '未対応' ? 'error' : 'warning'} 
                              sx={{ ml: 1 }} 
                            />
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* 契約終了が近い要員 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader title="契約終了が近い要員" />
            <CardContent>
              <List>
                {expiringContracts.map((contract) => (
                  <React.Fragment key={contract.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={contract.name}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'block' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {contract.company} - {contract.project}
                            </Typography>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              契約終了日: {contract.endDate}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        
        {/* 案件状況 */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="案件募集状況" />
            <CardContent>
              <Grid container spacing={2}>
                {projectStatus.map((project) => (
                  <Grid item xs={12} md={4} key={project.id}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {project.name}
                      </Typography>
                      <Chip 
                        label={project.status} 
                        size="small" 
                        color={project.status === '充足' ? 'success' : 'primary'} 
                        sx={{ mb: 2 }} 
                      />
                      <Typography variant="body2" gutterBottom>
                        応募者数: {project.applicants}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        採用数: {project.hired} / {project.required}
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(project.hired / project.required) * 100} 
                        color={project.hired >= project.required ? "success" : "primary"}
                        sx={{ mt: 1, height: 10, borderRadius: 5 }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
