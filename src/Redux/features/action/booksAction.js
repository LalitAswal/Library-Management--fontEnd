import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axios.js";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import API_ROUTES from "../apiConstants/apiConstant";


export const allBooksAction = createAsyncThunk(NAME_CONSTANT,async(data, {rejectWithValue})=>{
    
    const response = await axiosClient.get(API_ROUTES.ALL_BOOKS);
    return response;
})