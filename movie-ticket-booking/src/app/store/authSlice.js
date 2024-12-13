// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    error: null,
    success: null,
  },
  reducers: {
    registerSuccess(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
      state.success = 'Đăng ký thành công!';
    },
    registerFailure(state, action) {
      state.error = action.payload;
      state.success = null;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.error = null;
      state.success = 'Đăng nhập thành công!';
    },
    loginFailure(state, action) {
      state.error = action.payload;
      state.success = null;
    },
    clearMessages(state) {
      state.error = null;
      state.success = null;
    },
  },
});

export const { registerSuccess, registerFailure, loginSuccess, loginFailure, clearMessages } = authSlice.actions;
export default authSlice.reducer;