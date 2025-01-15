import { createSlice } from "@reduxjs/toolkit";
import ADMIN_NAME_CONSTANT from "../nameConstant/adminNameConstant.js";
import {  listAllUserAction, addUserInBulk, deleteUser } from "../action/adminAuthAction.js";
import { addBook, updateBook, bulkAddBook } from "../action/adminBookAction.js";
//
const initialState = {message: "", data:[], status: null, loading: false};

const handlePending = (state) =>{   
    state.loading = true;
}

const handleFulfilled = (state, pending) =>{
    state.loading = false;
    state.data = pending?.payload?.data;
    state.message = pending?.payload?.message;
    state.status = pending?.payload?.status;
}

const handleRejected = (state, rejected) =>{
    state.loading = false;
    state.message = rejected?.payload?.message;
    state.status = rejected?.payload?.status;
}

const createGenericSlice = (name, action) =>{
    createSlice({
        name,
        initialState,
        extraReducers: (builder) =>{
            builder
            .addCase(action.pending, handlePending)
            .addCase(action.fulfilled, handleFulfilled)
            .addCase(action.rejected, handleRejected);
        },
    });
}

const allUserSlice = createGenericSlice(
    ADMIN_NAME_CONSTANT.ALL_USER_LIST,
    listAllUserAction
);

const addBulkUserSlice = createGenericSlice(
    ADMIN_NAME_CONSTANT.BULK_ADD_USER,
    addUserInBulk
)

const deleteUserSlice = createGenericSlice(
    ADMIN_NAME_CONSTANT.DELETE_USER,
    deleteUser
)

export const allUserReducer = allUserSlice.reducer;
export const addBulkUserReducer = addBulkUserSlice.reducer;
export const deleteUserReducer = deleteUserSlice.reducer;


