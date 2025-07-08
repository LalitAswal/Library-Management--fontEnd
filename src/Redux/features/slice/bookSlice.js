import { createSlice } from "@reduxjs/toolkit";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import { allBooksAction, borrowBookAction, bookDetailsAction, searchBookAction } from "../action/booksAction.js";

const initialState = { message: "", data: [], status: null, loading: false };

const handlePending = (state) => {
  state.loading = true;
};

const handleFulfilled = (state, action) => {
  state.loading = false;
  console.log('cheking state------------------->', state)
  console.log('cheking action', action?.payload?.data)
  state.response = action?.payload?.data ;
  state.message = action?.payload?.message;
  state.status = action?.payload?.status;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.message = action?.payload?.message;
  state.status = action?.payload?.status;
};

const createGenericSlice = (name, action) =>
{
  return createSlice({
    name,
    initialState,
    extraReducers: (builder) => {

       console.log('handleFulfilled',action)
      builder
        .addCase(action.pending, handlePending)
        .addCase(action.fulfilled, handleFulfilled)
        .addCase(action.rejected, handleRejected);
    },
  });
}


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

const bookDetailsSlice  = createGenericSlice(
  NAME_CONSTANT.BOOK_DETAILS,
  bookDetailsAction
)
const searchBookSlice  = createGenericSlice(
  NAME_CONSTANT.SEARCH_BOOK,
  searchBookAction
)

export const allBooksReducer = allBooksSlice.reducer;
export const searchBookReducer = searchBookSlice.reducer;
export const borrowBookReducer = borrowBookSlice.reducer;
export const returnBookReducer = returnBookSlice.reducer;
export const bookDetailsReducer = bookDetailsSlice.reducer;