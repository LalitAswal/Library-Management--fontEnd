import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../services/axios";


const initialState = {message:"", data:[], state:null, loading:false}

export const userLoginAction = createAsyncThunk("login", async(userData, {rejectWithValue}) =>{
    try {
        const response = await axiosClient.post("/user/login", {...userData});
      return response;

    } catch (error) {
        rejectWithValue(error);
    }
});

const userLoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(userLoginAction.pending, (state) =>{
            state.loading = true;
        }),
        
        builder.addCase(userLoginAction.fulfilled , (state, action)=>{

        })
    }
})