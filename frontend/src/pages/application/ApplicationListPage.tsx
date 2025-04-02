import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  TablePagination,
  Button,
  TextField,
  InputAdornment,
  Chip,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

// モックデータ
const mockApplications = [
  { 
    id: 1, 
    applicantName: '山田太郎', 
    company: '株式会社テクノソリューション', 
    skills: 'Java, Spring, AWS', 
    project: 'ECサイト開発',
    appliedDate: '2025-03-25',
    rate: 750000,
    status: '審査中'
  },
  { 
    id: 2, 
    applicantName: '佐藤健太', 
    company: '株式会社ITエキスパート', 
    skills: 'AWS, Docker, Kubernetes', 
    project: 'クラウド移行プロジェクト',
    appliedDate: '2025-03-26',
    rate: 800000,
    status: '承認済'
  },
  { 
    id: 3, 
    applicantName: '田中花子', 
    company: '株式会社デジタルイノベーション', 
    skills: 'React, TypeScript, Node.js', 
    project: 'ECサイト開発',
    appliedDate: '2025-03-27',
    rate: 720000,
    status: '審査中'
  },
  { 
    id: 4, 
    applicantName: '鈴木一郎', 
    company: '株式会社テクノソリューション', 
    skills: 'Python, SQL, Tableau', 
    project: 'データ分析基盤構築',
    appliedDate: '2025-03-28',
    rate: 780000,
    status: '審査中'
  },
  { 
    id: 5, 
    applicantName: '高橋誠', 
    company: '株式会社クラウドシステムズ', 
    skills: 'C#, .NET, Azure', 
    project: 'ECサイト開発',
    appliedDate: '2025-03-20',
    rate: 750000,
    status: '却下'
  },
];

const ApplicationListPage: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };
  
  const filteredApplications = mockApplications.filter(application => 
    application.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '審査中':
        return 'warning';
      case '承認済':
        return 'success';
      case '却下':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          応募管理
        </Typography>
      </Box>
      
      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="氏名、会社名、スキル、案件名で検索..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="応募一覧">
          <TableHead>
            <TableRow>
              <TableCell>応募者名</TableCell>
              <TableCell>所属会社</TableCell>
              <TableCell>スキル</TableCell>
              <TableCell>応募案件</TableCell>
              <TableCell>応募日</TableCell>
              <TableCell>提示単価（月額）</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((application) => (
                <TableRow
                  key={application.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {application.applicantName}
                  </TableCell>
                  <TableCell>{application.company}</TableCell>
                  <TableCell>{application.skills}</TableCell>
                  <TableCell>{application.project}</TableCell>
                  <TableCell>{application.appliedDate}</TableCell>
                  <TableCell>{application.rate.toLocaleString()}円</TableCell>
                  <TableCell>
                    <Chip 
                      label={application.status} 
                      color={getStatusColor(application.status) as any} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => navigate(`/applications/${application.id}`)}
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    {application.status === '審査中' && (
                      <>
                        <IconButton 
                          color="success" 
                          size="small"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                        <IconButton 
                          color="error" 
                          size="small"
                        >
                          <CancelIcon />
                        </IconButton>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            {filteredApplications.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  検索条件に一致する応募が見つかりません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredApplications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="表示件数:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / ${count}`}
        />
      </TableContainer>
    </Box>
  );
};

export default ApplicationListPage;
