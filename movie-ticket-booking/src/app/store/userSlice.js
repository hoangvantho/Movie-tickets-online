
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload)); 
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user'); // Xóa thông tin người dùng khỏi localStorage
    },
    register: (state, action) => {
      state.currentUser = action.payload;
      // Không thay đổi trạng thái khi đăng ký
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
  },
    setUserFromLocalStorage: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout, register, updateUser, setUserFromLocalStorage } = userSlice.actions;
export default userSlice.reducer;
