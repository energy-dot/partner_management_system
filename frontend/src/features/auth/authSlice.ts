import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 認証状態の型定義
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// ユーザー情報の型定義
export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: string;
  department: string;
}

// 初期状態
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

// 認証スライスの作成
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ログイン開始
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    // ログイン成功
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    // ログイン失敗
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    // ログアウト
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
  },
});

// アクションをエクスポート
export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// リデューサーをエクスポート
export default authSlice.reducer;