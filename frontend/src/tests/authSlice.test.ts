import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, logout } from '../src/features/auth/authSlice';

// 認証スライスのテスト
describe('Auth Slice Tests', () => {
  let mock;
  
  beforeEach(() => {
    // Axiosのモックを設定
    mock = new MockAdapter(axios);
  });
  
  afterEach(() => {
    // モックをリセット
    mock.reset();
  });
  
  test('初期状態が正しい', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer
      }
    });
    
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
  
  test('ログインアクションが成功した場合', async () => {
    // モックレスポンスを設定
    const mockResponse = {
      success: true,
      token: 'test-token',
      user: {
        id: 1,
        username: 'testuser',
        fullName: 'Test User',
        email: 'test@example.com',
        role: 'user',
        department: 'IT'
      }
    };
    
    mock.onPost('/api/auth/login').reply(200, mockResponse);
    
    const store = configureStore({
      reducer: {
        auth: authReducer
      }
    });
    
    // ログインアクションをディスパッチ
    await store.dispatch(login({ username: 'testuser', password: 'password123' }));
    
    // 状態が正しく更新されていることを確認
    const state = store.getState().auth;
    expect(state.user).toEqual(mockResponse.user);
    expect(state.token).toBe(mockResponse.token);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
  
  test('ログインアクションが失敗した場合', async () => {
    // モックレスポンスを設定
    const mockResponse = {
      success: false,
      message: 'ユーザー名またはパスワードが正しくありません'
    };
    
    mock.onPost('/api/auth/login').reply(401, mockResponse);
    
    const store = configureStore({
      reducer: {
        auth: authReducer
      }
    });
    
    // ログインアクションをディスパッチ
    await store.dispatch(login({ username: 'testuser', password: 'wrongpassword' }));
    
    // 状態が正しく更新されていることを確認
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockResponse.message);
  });
  
  test('ログアウトアクションが正しく機能する', () => {
    // 初期状態を認証済みに設定
    const initialState = {
      user: {
        id: 1,
        username: 'testuser',
        fullName: 'Test User',
        email: 'test@example.com',
        role: 'user',
        department: 'IT'
      },
      token: 'test-token',
      isAuthenticated: true,
      loading: false,
      error: null
    };
    
    const store = configureStore({
      reducer: {
        auth: authReducer
      },
      preloadedState: {
        auth: initialState
      }
    });
    
    // ログアウトアクションをディスパッチ
    store.dispatch(logout());
    
    // 状態が正しくリセットされていることを確認
    const state = store.getState().auth;
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
});
