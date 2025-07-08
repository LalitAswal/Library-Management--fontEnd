import { createSlice } from "@reduxjs/toolkit";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import { borrowedBookListAction, userLoginAction, userProfileAction, userRegisterAction } from "../action/authAction.js";

const initialState = { message: "", data: [], status: null, loading: false };

const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  console.log('cheking 000 action', action.payload)
  state.data = action.payload?.data ?? action.payload;
  console.log('cstate.data', state?.data)

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
const userProfileSlice = createGenericSlice(
  NAME_CONSTANT.PROFILE,
  userProfileAction
);
const borrowedBookListSlice = createGenericSlice(
  NAME_CONSTANT.BORROWED_BOOK_LIST,
  borrowedBookListAction
);
export const loginReducer = userLoginSlice.reducer;
export const registrationReducer = userRegistrationSlice.reducer;
export const profileSliceReducer = userProfileSlice.reducer;
export const borrowedBookListReducer = borrowedBookListSlice.reducer;
