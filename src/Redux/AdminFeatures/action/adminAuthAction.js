import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '../../../services/axios';
import ADMIN_NAME_CONSTANT from '../nameConstant/adminNameConstant';
import ADMIN_API_ROUTES from '../apiConstant/adminApiConstant';

export const listAllUserAction = createAsyncThunk(
  ADMIN_NAME_CONSTANT.ALL_USER_LIST,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(ADMIN_API_ROUTES.ALL_USER_LIST);
      console.log('response all user::::::::::::', response.data);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  ADMIN_NAME_CONSTANT.UPDATE_USER,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ADMIN_API_ROUTES.UPDATE_USER);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const addUserInBulkAction = createAsyncThunk(
  ADMIN_NAME_CONSTANT.BULK_ADD_USER,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ADMIN_API_ROUTES.BULK_ADD_BOOK);
      console.log('response bulk add user', response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  ADMIN_NAME_CONSTANT.DELETE_USER,
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`${ADMIN_API_ROUTES.DELETE_USER}/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
