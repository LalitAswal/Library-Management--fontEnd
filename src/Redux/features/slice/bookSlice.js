import { createSlice } from "@reduxjs/toolkit";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import { allBooksAction, borrowBookAction } from "../action/booksAction.js";

const initialState = { message: "", data: [], status: null, loading: false };

const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  state.data = action?.payload?.data.response;
  state.message = action?.payload?.data.message;
  state.status = action?.payload?.status;
  console.log("state.data", action?.payload?.data.response);
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.message = action?.payload?.message;
  state.status = action?.payload?.status;
};

const createGenericSlice = (name, action) =>
  createSlice({
    name,
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    },
  });

const allBooksSlice = createGenericSlice(
  NAME_CONSTANT.ALL_BOOKS,
  allBooksAction
);
const borrowBookSlice = createGenericSlice(
  NAME_CONSTANT.BORROW_BOOK,
  borrowBookAction
);
const returnBookSlice = createGenericSlice(
  NAME_CONSTANT.RETURN_BOOK,
  borrowBookAction
);

export const allBooksReducer = allBooksSlice.reducer;
export const borrowBookReducer = borrowBookSlice.reducer;
export const returnBookReducer = returnBookSlice.reducer;
