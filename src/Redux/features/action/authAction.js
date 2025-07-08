import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axios.js";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import API_ROUTES from "../apiConstants/apiConstant.js";

export const userLoginAction = createAsyncThunk(
  NAME_CONSTANT.LOGIN,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_ROUTES.LOGIN, { ...userData });
      console.log("response login", response.data);
      console.log("API_ROUTES.LOGIN", API_ROUTES.LOGIN);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred"); 
    }
  }
);

export const userRegisterAction = createAsyncThunk(
  NAME_CONSTANT.REGISTER,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_ROUTES.REGISTER, { ...userData });
      console.log("response register", response.data);
      console.log("API_ROUTES.REGISTER", API_ROUTES.REGISTER);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const userProfileAction = createAsyncThunk(
  NAME_CONSTANT.PROFILE,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_ROUTES.PROFILE, { ...userData });
      return response?.data?.response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);


export const borrowedBookListAction = createAsyncThunk(
  NAME_CONSTANT.BORROWED_BOOK_LIST,
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_ROUTES.BORROWED_BOOK_LIST, { ...userData });
      console.log("response BORROWED_BOOK_LIST", response.data);
      return response?.data?.response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
