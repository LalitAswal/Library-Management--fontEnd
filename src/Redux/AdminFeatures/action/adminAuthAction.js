import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axios";
import ADMIN_NAME_CONSTANT from "../nameConstant/adminNameConstant";
import ADMIN_API_ROUTES from "../apiConstant/adminApiConstant";

export const listAllUserAction = createAsyncThunk(
  ADMIN_NAME_CONSTANT.ALL_USER_LIST,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(ADMIN_API_ROUTES.ALL_USER_LIST);
      console.log("response all user", response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const addUserInBulk = createAsyncThunk(
  ADMIN_NAME_CONSTANT.BULK_ADD_USER,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ADMIN_API_ROUTES.BULK_ADD_BOOK);
      console.log("response bulk add user", response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  ADMIN_NAME_CONSTANT.DELETE_USER,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(ADMIN_API_ROUTES.DELETE_USER, {
        ...data,
      });
      console.log("response delete user", response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
