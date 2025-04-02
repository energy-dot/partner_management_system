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
const mockProjects = [
  { 
    id: 1, 
    code: 'PRJ-2025-001', 
    name: 'ECサイト開発', 
    department: 'デジタル事業部', 
    manager: '山田太郎',
    startDate: '2025-05-01',
    endDate: '2025-10-31',
    requiredSkills: 'React, TypeScript, Node.js',
    headcount: 8,
    status: '募集中',
    applicants: 12,
    hired: 5
  },
  { 
    id: 2, 
    code: 'PRJ-2025-002', 
    name: 'クラウド移行プロジェクト', 
    department: 'インフラ事業部', 
    manager: '佐藤次郎',
    startDate: '2025-06-01',
    endDate: '2025-12-31',
    requiredSkills: 'AWS, Docker, Kubernetes',
    headcount: 5,
    status: '募集中',
    applicants: 8,
    hired: 3
  },
  { 
    id: 3, 
    code: 'PRJ-2025-003', 
    name: 'データ分析基盤構築', 
    department: 'データサイエンス部', 
    manager: '鈴木花子',
    startDate: '2025-05-15',
    endDate: '2025-09-30',
    requiredSkills: 'Python, SQL, Tableau',
    headcount: 6,
    status: '充足',
    applicants: 15,
    hired: 6
  },
  { 
    id: 4, 
    code: 'PRJ-2025-004', 
    name: 'モバイルアプリ開発', 
    department: 'モバイル事業部', 
    manager: '高橋健太',
    startDate: '2025-07-01',
    endDate: '2025-12-31',
    requiredSkills: 'Swift, Kotlin, Firebase',
    headcount: 4,
    status: '承認待ち',
    applicants: 0,
    hired: 0
  },
  { 
    id: 5, 
    code: 'PRJ-2025-005', 
    name: 'セキュリティ強化プロジェクト', 
    department: 'セキュリティ部', 
    manager: '伊藤誠',
    startDate: '2025-06-15',
    endDate: '2025-08-31',
    requiredSkills: 'セキュリティ診断, ネットワーク, ファイアウォール',
    headcount: 3,
    status: '下書き',
    applicants: 0,
    hired: 0
  },
];

const ProjectListPage: React.FC = () => {
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
  
  const filteredProjects = mockProjects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.requiredSkills.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '募集中':
        return 'primary';
      case '充足':
        return 'success';
      case '承認待ち':
        return 'warning';
      case '下書き':
        return 'default';
      case '終了':
        return 'secondary';
      case '中止':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          案件一覧
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/projects/new')}
        >
          新規登録
        </Button>
      </Box>
      
      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="案件名、案件コード、部署、担当者、スキルで検索..."
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
        <Table sx={{ minWidth: 650 }} aria-label="案件一覧">
          <TableHead>
            <TableRow>
              <TableCell>案件コード</TableCell>
              <TableCell>案件名</TableCell>
              <TableCell>部署</TableCell>
              <TableCell>担当者</TableCell>
              <TableCell>期間</TableCell>
              <TableCell>必須スキル</TableCell>
              <TableCell>募集人数</TableCell>
              <TableCell>応募/採用</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((project) => (
                <TableRow
                  key={project.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{project.code}</TableCell>
                  <TableCell component="th" scope="row">
                    {project.name}
                  </TableCell>
                  <TableCell>{project.department}</TableCell>
                  <TableCell>{project.manager}</TableCell>
                  <TableCell>{`${project.startDate} 〜 ${project.endDate}`}</TableCell>
                  <TableCell>{project.requiredSkills}</TableCell>
                  <TableCell>{project.headcount}名</TableCell>
                  <TableCell>{`${project.applicants}/${project.hired}`}</TableCell>
                  <TableCell>
                    <Chip 
                      label={project.status} 
                      color={getStatusColor(project.status) as any} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => navigate(`/projects/${project.id}`)}
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      color="secondary" 
                      onClick={() => navigate(`/projects/${project.id}/edit`)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {filteredProjects.length === 0 && (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  検索条件に一致する案件が見つかりません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredProjects.length}
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

export default ProjectListPage;
