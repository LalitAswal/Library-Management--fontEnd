import { createSlice } from "@reduxjs/toolkit";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import { userLoginAction, userRegisterAction } from "../action/authAction.js";

const initialState = { message: "", data: [], status: null, loading: false };

// User Login Slice
const userLoginSlice = createSlice({
  name: NAME_CONSTANT.LOGIN,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLoginAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLoginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
        state.message = action?.payload?.message;
        state.status = action?.payload?.status;
      })
      .addCase(userLoginAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message;
        state.status = action?.payload?.status;
      });
  },
});
// User Registration Slice
const userRegistrationSlice = createSlice({
  name: NAME_CONSTANT.REGISTER,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegisterAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegisterAction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action?.payload?.data;
        state.message = action?.payload?.message;
        state.status = action?.payload?.status;
      })
      .addCase(userRegisterAction.rejected, (state, action) => {
        state.loading = false;
        state.message = action?.payload?.message;
        state.status = action?.payload?.status;
      });
  },
});

export const loginReducer = userLoginSlice.reducer;
export const registrationReducer = userRegistrationSlice.reducer;
