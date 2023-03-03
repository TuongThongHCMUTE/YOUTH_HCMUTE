import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    user: null,
  },
  reducers: {
    login(state, action) {
      const userPayload = action.payload.user;
      state.token = action.payload.token;
      state.user = {
        id: userPayload._id,
        name: userPayload.tenHienThi,
        firstName: userPayload.ten,
        lastName: userPayload.ho,
        role: userPayload.role,
        position: userPayload.chucVu,
        avatar: userPayload.image,
        email: userPayload.email,
        phone: userPayload.soDienThoai,
        address: userPayload.diaChi,
        faculty: userPayload.donVi,
      };
    },
    logout(state) {
      state.token = '';
      state.user = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;