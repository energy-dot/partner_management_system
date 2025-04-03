// テスト用ユーティリティファイル
import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import theme from '../utils/theme';

// テスト用のモックストアを作成する関数
export const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      // 他の必要なリデューサーをここに追加
    }
  });
};

// テスト用のラッパーコンポーネントを使用してレンダリングする関数
export const renderWithProviders = (
  ui,
  {
    store = createTestStore(),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};
