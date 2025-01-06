import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axios.js";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import API_ROUTES from "../apiConstants/apiConstant.js";


export const userLoginAction = createAsyncThunk(NAME_CONSTANT.LOGIN, async(userData, {rejectWithValue}) =>{
    try {
        const response = await axiosClient.post(API_ROUTES.LOGIN, {...userData});
        console.log("response login", response);
      return response;

    } catch (error) {
        rejectWithValue(error);
    }
});

export const userRegisterAction = createAsyncThunk(NAME_CONSTANT.REGISTER, async(userData, {rejectWithValue}) =>{
    try{
        const response = await axiosClient.post(API_ROUTES.REGISTER, {...userData});
        console.log("response register", response);
        return response;
    }catch(error){
        rejectWithValue(error);
    }
})

