import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAppSelector } from './store';
import MainLayout from './layouts/MainLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import PartnerListPage from './pages/partner/PartnerListPage';
import PartnerDetailPage from './pages/partner/PartnerDetailPage';
import ProjectListPage from './pages/project/ProjectListPage';
import ProjectDetailPage from './pages/project/ProjectDetailPage';
import ApplicationListPage from './pages/application/ApplicationListPage';
import MemberListPage from './pages/member/MemberListPage';
import MemberDetailPage from './pages/member/MemberDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// 認証が必要なルートをラップするコンポーネント
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          <Route path="partners">
            <Route index element={<PartnerListPage />} />
            <Route path=":id" element={<PartnerDetailPage />} />
          </Route>
          
          <Route path="projects">
            <Route index element={<ProjectListPage />} />
            <Route path=":id" element={<ProjectDetailPage />} />
          </Route>
          
          <Route path="applications" element={<ApplicationListPage />} />
          
          <Route path="members">
            <Route index element={<MemberListPage />} />
            <Route path=":id" element={<MemberDetailPage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Box>
  );
};

export default App;
