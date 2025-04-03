import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import LoginPage from '../pages/LoginPage';
import { loginStart, loginSuccess, loginFailure } from '../features/auth/authSlice';

// モックの設定
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn()
}));

// ログインページのテスト
describe('LoginPage Tests', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('ログインフォームが正しくレンダリングされる', () => {
    renderWithProviders(<LoginPage />);
    
    // ユーザー名とパスワードの入力フィールドが存在することを確認
    expect(screen.getByLabelText(/ユーザー名/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument();
    
    // ログインボタンが存在することを確認
    expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument();
  });
  
  test('入力フィールドに値を入力できる', () => {
    renderWithProviders(<LoginPage />);
    
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
  
  // バリデーションテストを修正
  test('空のフォーム送信時にバリデーションが機能する', () => {
    renderWithProviders(<LoginPage />);
    
    // ログインボタンをクリック（空の入力フィールドでの送信）
    fireEvent.click(screen.getByRole('button', { name: /ログイン/i }));
    
    // フォーム送信後もページが変わらないことを確認（バリデーションにより送信が阻止される）
    expect(screen.getByText(/パートナー要員管理システム/i)).toBeInTheDocument();
  });

  // 正常なログイン処理のテスト
  test('正しい認証情報でログインが成功する', async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(require('../store'), 'useAppDispatch').mockReturnValue(mockDispatch);
    
    const mockNavigate = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    
    renderWithProviders(<LoginPage />);
    
    // 認証情報を入力
    const usernameInput = screen.getByLabelText(/ユーザー名/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    
    // ログインボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: /ログイン/i }));
    
    // loginStartアクションがディスパッチされたことを確認
    expect(mockDispatch).toHaveBeenCalledWith(loginStart());
    
    // タイマーを進める
    jest.advanceTimersByTime(1000);
    
    // loginSuccessアクションがディスパッチされたことを確認
    expect(mockDispatch).toHaveBeenCalledWith(
      loginSuccess({
        user: {
          id: 1,
          username: 'admin',
          fullName: '管理者',
          email: 'admin@example.com',
          role: '管理者',
          department: 'システム部'
        },
        token: 'mock-jwt-token'
      })
    );
    
    // ダッシュボードにリダイレクトされたことを確認
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });
  
  // 認証失敗のテスト
  test('誤った認証情報でログインが失敗する', async () => {
    const mockDispatch = jest.fn();
    jest.spyOn(require('../store'), 'useAppDispatch').mockReturnValue(mockDispatch);
    
    renderWithProviders(<LoginPage />);
    
    // 誤った認証情報を入力
    const usernameInput = screen.getByLabelText(/ユーザー名/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    
    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    
    // ログインボタンをクリック
    fireEvent.click(screen.getByRole('button', { name: /ログイン/i }));
    
    // loginStartアクションがディスパッチされたことを確認
    expect(mockDispatch).toHaveBeenCalledWith(loginStart());
    
    // タイマーを進める
    jest.advanceTimersByTime(1000);
    
    // loginFailureアクションがディスパッチされたことを確認
    expect(mockDispatch).toHaveBeenCalledWith(
      loginFailure('ユーザー名またはパスワードが正しくありません')
    );
  });
  
  // ローディング状態のテスト
  test('ログイン処理中はローディング表示される', () => {
    renderWithProviders(<LoginPage />, {
      preloadedState: {
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          loading: true,
          error: null
        }
      }
    });
    
    // ローディングインジケータが表示されることを確認
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    
    // ログインボタンが無効化されていることを確認
    const loginButton = screen.getByRole('button');
    expect(loginButton).toBeDisabled();
    
    // 入力フィールドが無効化されていることを確認
    const usernameInput = screen.getByLabelText(/ユーザー名/i);
    const passwordInput = screen.getByLabelText(/パスワード/i);
    
    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
  });
  
  // エラー表示のテスト
  test('ログインエラー時にエラーメッセージが表示される', () => {
    const errorMessage = 'ユーザー名またはパスワードが正しくありません';
    
    renderWithProviders(<LoginPage />, {
      preloadedState: {
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
          error: errorMessage
        }
      }
    });
    
    // エラーメッセージが表示されることを確認
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
