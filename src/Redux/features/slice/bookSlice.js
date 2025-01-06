import { createSlice } from "@reduxjs/toolkit";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import { allBooksAction, borrowBookAction } from "../action/booksAction.js";

const initialState = { message: "", data: [], status: null, loading: false };


const allBooksSlice = createSlice({
    name: NAME_CONSTANT.ALL_BOOKS,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(allBooksAction.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(allBooksAction.fulfilled, (state, action) => {      
            state.loading = false;
            state.data = action?.payload?.data.response;
            state.message = action?.payload?.data.message;
            state.status = action?.payload?.status;
            console.log('state.data',action?.payload?.data.response)
        }   
        );  
        builder.addCase(allBooksAction.rejected, (state, action) => {
            state.loading = false;
            state.message = action?.payload?.message;
            state.status = action?.payload?.status;
        });
    },
    });

const BorrowBookSlice = createSlice({
    name: NAME_CONSTANT.BORROW_BOOK,
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(borrowBookAction.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(borrowBookAction.fulfilled, (state, action) => {      
            state.loading = false;
            state.data = action?.payload?.data.response;
            state.message = action?.payload?.data.message;
            state.status = action?.payload?.status;
            console.log('state.data',action?.payload?.data.response)
        }   
        );
        builder.addCase(borrowBookAction.rejected, (state, action) => {
            state.loading = false;
            state.message = action?.payload?.message;
            state.status = action?.payload?.status;
        });
}
});

export const borrowBookReducer = BorrowBookSlice.reducer;

export const allBooksReducer = allBooksSlice.reducer;