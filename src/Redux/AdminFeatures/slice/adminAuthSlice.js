import { createSlice } from "@reduxjs/toolkit";
import ADMIN_NAME_CONSTANT from "../nameConstant/adminNameConstant.js";
import { listAllUserAction, addUserInBulk, deleteUser } from "../action/adminAuthAction.js";

const initialState = { message: "", data: [], status: null, loading: false };

const handlePending = (state) => {
    state.loading = true;
};

const handleFulfilled = (state, action) => {
    console.log('action?.payload?.data',action?.payload?.data)
    state.loading = false;
    state.data = action?.payload?.data;
    state.message = action?.payload?.message;
    state.status = action?.payload?.status;
};

const handleRejected = (state, action) => {
    state.loading = false;
    state.message = action?.payload?.message;
    state.status = action?.payload?.status;
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

const allUserSlice = createGenericSlice(
    ADMIN_NAME_CONSTANT.ALL_USER_LIST,
    listAllUserAction
);

const addBulkUserSlice = createGenericSlice(
    ADMIN_NAME_CONSTANT.BULK_ADD_USER,
    addUserInBulk
);

const deleteUserSlice = createGenericSlice(
    ADMIN_NAME_CONSTANT.DELETE_USER,
    deleteUser
);

export const allUserReducer = allUserSlice.reducer;
export const addBulkUserReducer = addBulkUserSlice.reducer;
export const deleteUserReducer = deleteUserSlice.reducer;