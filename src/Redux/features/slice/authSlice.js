import { createSlice } from "@reduxjs/toolkit";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import { userLoginAction, userRegisterAction } from "../action/authAction.js";

const initialState = { message: "", data: [], status: null, loading: false };

const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.data = action.payload?.data || action.payload;
  state.message = action.payload?.message || "Success";
  state.status = action.payload?.status || 200;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.message = action.payload?.message || "An error occurred";
  state.status = action.payload?.status || 500;
};

const createGenericSlice = (name, action) => {
  return createSlice({
    name,
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    },
  });
};


const userLoginSlice = createGenericSlice(NAME_CONSTANT.LOGIN, userLoginAction);
const userRegistrationSlice = createGenericSlice(
  NAME_CONSTANT.REGISTER,
  userRegisterAction
);
export const loginReducer = userLoginSlice.reducer;
export const registrationReducer = userRegistrationSlice.reducer;
