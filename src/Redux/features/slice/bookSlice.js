import { createSlice } from "@reduxjs/toolkit";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import { allBooksAction } from "../action/booksAction.js";

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
            state.data = action?.payload?.data;
            state.message = action?.payload?.message;
            state.status = action?.payload?.status;
        }   
        );  
        builder.addCase(allBooksAction.rejected, (state, action) => {
            state.loading = false;
            state.message = action?.payload?.message;
            state.status = action?.payload?.status;
        });
    },
    });

export const allBooksReducer = allBooksSlice.reducer;