import { createSlice } from '@reduxjs/toolkit';
import ADMIN_NAME_CONSTANT from '../nameConstant/adminNameConstant.js';
import { addBookAction, bulkAddBookAction, updateBookAction } from '../action/adminBookAction.js';
//
const initialState = { message: '', data: [], status: null, loading: false };

const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (state, pending) => {
  state.loading = false;
  state.data = pending?.payload?.data;
  state.message = pending?.payload?.message;
  state.status = pending?.payload?.status;
};

const handleRejected = (state, rejected) => {
  state.loading = false;
  state.message = rejected?.payload?.message;
  state.status = rejected?.payload?.status;
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

const addBookSlice = createGenericSlice(ADMIN_NAME_CONSTANT.ADD_BOOK, addBookAction);

const uploadBookSlice = createGenericSlice(ADMIN_NAME_CONSTANT.BULK_ADD_BOOK, bulkAddBookAction);

const bulkAddBookSlice = createGenericSlice(ADMIN_NAME_CONSTANT.UPDATE_BOOK, updateBookAction);

export const addBookReducer = addBookSlice.reducer;
export const uploadBookReducer = uploadBookSlice.reducer;
export const bulkAddBookReducer = bulkAddBookSlice.reducer;
