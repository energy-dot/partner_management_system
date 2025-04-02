import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const NotFoundPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 64px - 48px)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: 500,
        }}
      >
        <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 'bold' }}>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          ページが見つかりません
        </Typography>
        <Typography variant="body1" align="center" color="text.secondary">
          お探しのページは存在しないか、移動した可能性があります。
          URLを確認するか、ダッシュボードに戻ってください。
        </Typography>
      </Paper>
    </Box>
  );
};

export default NotFoundPage;
