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
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

// モックデータ
const mockMembers = [
  { 
    id: 1, 
    name: '山田太郎', 
    company: '株式会社テクノソリューション', 
    skills: 'Java, Spring, AWS', 
    project: 'ECサイト開発',
    startDate: '2025-05-01',
    endDate: '2025-10-31',
    rate: 750000,
    status: '稼働中'
  },
  { 
    id: 2, 
    name: '佐藤健太', 
    company: '株式会社ITエキスパート', 
    skills: 'AWS, Docker, Kubernetes', 
    project: 'クラウド移行プロジェクト',
    startDate: '2025-06-01',
    endDate: '2025-12-31',
    rate: 800000,
    status: '稼働中'
  },
  { 
    id: 3, 
    name: '田中花子', 
    company: '株式会社デジタルイノベーション', 
    skills: 'React, TypeScript, Node.js', 
    project: 'ECサイト開発',
    startDate: '2025-05-15',
    endDate: '2025-10-31',
    rate: 720000,
    status: '稼働中'
  },
  { 
    id: 4, 
    name: '鈴木一郎', 
    company: '株式会社テクノソリューション', 
    skills: 'Python, SQL, Tableau', 
    project: 'データ分析基盤構築',
    startDate: '2025-05-15',
    endDate: '2025-09-30',
    rate: 780000,
    status: '稼働中'
  },
  { 
    id: 5, 
    name: '高橋誠', 
    company: '株式会社クラウドシステムズ', 
    skills: 'C#, .NET, Azure', 
    project: '社内システム刷新',
    startDate: '2025-04-01',
    endDate: '2025-04-30',
    rate: 750000,
    status: '契約終了予定'
  },
];

const MemberListPage: React.FC = () => {
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
  
  const filteredMembers = mockMembers.filter(member => 
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.skills.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '稼働中':
        return 'success';
      case '契約終了予定':
        return 'warning';
      case '契約終了':
        return 'default';
      case '休業中':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          要員一覧
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/members/new')}
        >
          新規登録
        </Button>
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
        <Table sx={{ minWidth: 650 }} aria-label="要員一覧">
          <TableHead>
            <TableRow>
              <TableCell>氏名</TableCell>
              <TableCell>所属会社</TableCell>
              <TableCell>スキル</TableCell>
              <TableCell>案件</TableCell>
              <TableCell>契約期間</TableCell>
              <TableCell>単価（月額）</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((member) => (
                <TableRow
                  key={member.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {member.name}
                  </TableCell>
                  <TableCell>{member.company}</TableCell>
                  <TableCell>{member.skills}</TableCell>
                  <TableCell>{member.project}</TableCell>
                  <TableCell>{`${member.startDate} 〜 ${member.endDate}`}</TableCell>
                  <TableCell>{member.rate.toLocaleString()}円</TableCell>
                  <TableCell>
                    <Chip 
                      label={member.status} 
                      color={getStatusColor(member.status) as any} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => navigate(`/members/${member.id}`)}
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      color="secondary" 
                      onClick={() => navigate(`/members/${member.id}/edit`)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {filteredMembers.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  検索条件に一致する要員が見つかりません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredMembers.length}
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

export default MemberListPage;
