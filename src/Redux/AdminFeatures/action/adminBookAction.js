import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axios";
import ADMIN_NAME_CONSTANT from "../nameConstant/adminNameConstant";
import ADMIN_API_ROUTES from "../apiConstant/adminApiConstant";

export const addBook = createAsyncThunk(
  ADMIN_API_ROUTES.ADD_BOOK,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ADMIN_API_ROUTES.ADD_BOOK, {
        ...data,
      });
      console.log("response add book", response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const updateBook = createAsyncThunk(
  ADMIN_NAME_CONSTANT.UPDATE_BOOK,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.put(ADMIN_API_ROUTES.UPDATE_BOOK, {
        ...data,
      });
      console.log("response update book", response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const bulkAddBook = createAsyncThunk(
  ADMIN_NAME_CONSTANT.BULK_ADD_BOOK,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(ADMIN_API_ROUTES.BULK_ADD_BOOK, {
        ...data,
      });
      console.log("response bulk add book", response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
