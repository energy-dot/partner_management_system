import { configureStore } from '@reduxjs/toolkit';
import authReducer, { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout,
  AuthState,
  User
} from '../features/auth/authSlice';

// LocalStorageのモック
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Auth Slice Tests', () => {
  let initialState: AuthState;
  
  beforeEach(() => {
    // 各テスト前にlocalStorageをクリア
    localStorage.clear();
    
    // 初期状態を設定
    initialState = {
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null
    };
  });
  
  test('初期状態が正しく設定される', () => {
    const store = configureStore({
      reducer: { auth: authReducer }
    });
    
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });
  
  test('loginStartアクションが正しく処理される', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: initialState }
    });
    
    store.dispatch(loginStart());
    
    const state = store.getState().auth;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  
  test('loginSuccessアクションが正しく処理される', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: initialState }
    });
    
    const mockUser: User = {
      id: 1,
      username: 'testuser',
      fullName: 'Test User',
      email: 'test@example.com',
      role: 'テスター',
      department: 'テスト部門'
    };
    
    const mockToken = 'test-token-123';
    
    store.dispatch(loginSuccess({ user: mockUser, token: mockToken }));
    
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    
    // localStorageにトークンが保存されていることを確認
    expect(localStorage.getItem('token')).toBe(mockToken);
  });
  
  test('loginFailureアクションが正しく処理される', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { 
        auth: {
          ...initialState,
          loading: true // ローディング中の状態から開始
        } 
      }
    });
    
    const errorMessage = 'ログインに失敗しました';
    store.dispatch(loginFailure(errorMessage));
    
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
  
  test('logoutアクションが正しく処理される', () => {
    // ログイン済みの状態から開始
    const loggedInState: AuthState = {
      isAuthenticated: true,
      user: {
        id: 1,
        username: 'testuser',
        fullName: 'Test User',
        email: 'test@example.com',
        role: 'テスター',
        department: 'テスト部門'
      },
      token: 'test-token-123',
      loading: false,
      error: null
    };
    
    // localStorageにトークンを設定
    localStorage.setItem('token', 'test-token-123');
    
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { auth: loggedInState }
    });
    
    store.dispatch(logout());
    
    const state = store.getState().auth;
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    
    // localStorageからトークンが削除されていることを確認
    expect(localStorage.getItem('token')).toBeNull();
  });
  
  test('ローディング中にエラーが発生した場合の処理', () => {
    const store = configureStore({
      reducer: { auth: authReducer },
      preloadedState: { 
        auth: {
          ...initialState,
          loading: true,
          error: null
        } 
      }
    });
    
    const errorMessage = 'ネットワークエラーが発生しました';
    store.dispatch(loginFailure(errorMessage));
    
    const state = store.getState().auth;
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
  
  test('既存のトークンがある場合の初期状態', () => {
    // localStorageにトークンを設定
    const mockToken = 'existing-token-456';
    localStorage.setItem('token', mockToken);
    
    // Reduxストアを初期化
    const store = configureStore({
      reducer: { auth: authReducer }
    });
    
    // 初期状態でトークンが読み込まれていることを確認
    const state = store.getState().auth;
    expect(state.token).toBe(mockToken);
  });
});
