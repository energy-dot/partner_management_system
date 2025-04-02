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
const mockPartners = [
  { 
    id: 1, 
    name: '株式会社テクノソリューション', 
    address: '東京都港区芝浦3-4-1', 
    phone: '03-1234-5678', 
    status: '取引中',
    representative: '鈴木一郎',
    employeeCount: 120,
    establishedDate: '2005-04-01'
  },
  { 
    id: 2, 
    name: '株式会社ITエキスパート', 
    address: '東京都新宿区西新宿2-1-1', 
    phone: '03-8765-4321', 
    status: '取引中',
    representative: '佐藤健太',
    employeeCount: 85,
    establishedDate: '2010-07-15'
  },
  { 
    id: 3, 
    name: '株式会社デジタルイノベーション', 
    address: '東京都渋谷区渋谷1-2-3', 
    phone: '03-2345-6789', 
    status: '取引中',
    representative: '田中花子',
    employeeCount: 65,
    establishedDate: '2015-10-20'
  },
  { 
    id: 4, 
    name: '株式会社クラウドシステムズ', 
    address: '東京都千代田区丸の内1-1-1', 
    phone: '03-3456-7890', 
    status: '取引停止',
    representative: '高橋誠',
    employeeCount: 200,
    establishedDate: '2000-01-10'
  },
  { 
    id: 5, 
    name: '株式会社ネットワークプロ', 
    address: '大阪府大阪市北区梅田1-1-3', 
    phone: '06-1234-5678', 
    status: '候補',
    representative: '伊藤洋子',
    employeeCount: 45,
    establishedDate: '2018-03-05'
  },
];

const PartnerListPage: React.FC = () => {
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
  
  const filteredPartners = mockPartners.filter(partner => 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.representative.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case '取引中':
        return 'success';
      case '取引停止':
        return 'error';
      case '候補':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          パートナー会社一覧
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/partners/new')}
        >
          新規登録
        </Button>
      </Box>
      
      <Paper sx={{ mb: 3, p: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="会社名、住所、代表者名で検索..."
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
        <Table sx={{ minWidth: 650 }} aria-label="パートナー会社一覧">
          <TableHead>
            <TableRow>
              <TableCell>会社名</TableCell>
              <TableCell>住所</TableCell>
              <TableCell>電話番号</TableCell>
              <TableCell>代表者</TableCell>
              <TableCell>従業員数</TableCell>
              <TableCell>設立日</TableCell>
              <TableCell>ステータス</TableCell>
              <TableCell align="center">操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPartners
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((partner) => (
                <TableRow
                  key={partner.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {partner.name}
                  </TableCell>
                  <TableCell>{partner.address}</TableCell>
                  <TableCell>{partner.phone}</TableCell>
                  <TableCell>{partner.representative}</TableCell>
                  <TableCell>{partner.employeeCount}名</TableCell>
                  <TableCell>{partner.establishedDate}</TableCell>
                  <TableCell>
                    <Chip 
                      label={partner.status} 
                      color={getStatusColor(partner.status) as any} 
                      size="small" 
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton 
                      color="primary" 
                      onClick={() => navigate(`/partners/${partner.id}`)}
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton 
                      color="secondary" 
                      onClick={() => navigate(`/partners/${partner.id}/edit`)}
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            {filteredPartners.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  検索条件に一致するパートナー会社が見つかりません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPartners.length}
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

export default PartnerListPage;
