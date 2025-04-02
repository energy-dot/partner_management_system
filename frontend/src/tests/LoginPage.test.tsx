import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import LoginPage from '../src/pages/LoginPage';
import theme from '../src/utils/theme';
import store from '../src/store';

// ログインページのテスト
describe('LoginPage Tests', () => {
  test('ログインフォームが正しくレンダリングされる', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <LoginPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
    
    // ユーザー名とパスワードの入力フィールドが存在することを確認
    expect(screen.getByLabelText(/ユーザー名/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    
    // ログインボタンが存在することを確認
    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument();
  });
  
  test('入力フィールドに値を入力できる', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <LoginPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
    
    // ユーザー名とパスワードの入力フィールドを取得
    const usernameInput = screen.getByLabelText(/ユーザー名/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    
    // 値を入力
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    // 入力値が正しく設定されていることを確認
    expect(usernameInput).toHaveValue('testuser');
    expect(passwordInput).toHaveValue('password123');
  });
  
  test('バリデーションが機能する', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <LoginPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
    
    // ログインボタンをクリック（空の入力フィールドでの送信）
    fireEvent.click(screen.getByRole('button', { name: /ログイン/i }));
    
    // バリデーションエラーメッセージが表示されることを確認
    await waitFor(() => {
      expect(screen.getByText(/ユーザー名を入力してください/i)).toBeInTheDocument();
    });
  });
});
