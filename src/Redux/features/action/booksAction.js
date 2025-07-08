import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axios.js";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import API_ROUTES from "../apiConstants/apiConstant";

export const allBooksAction = createAsyncThunk(
  NAME_CONSTANT.ALL_BOOKS,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_ROUTES.ALL_BOOKS, {
        ...data,
      });
      console.log('checking response  all book action', response?.data?.response)
      return {
  data: response?.data?.response,
  message: response?.data?.message,
  status: response?.status
};
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const searchBookAction = createAsyncThunk(
  NAME_CONSTANT.SEARCH_BOOK,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(API_ROUTES.SEARCH_BOOK, {
        ...data,
      });
      console.log('response all books', response.data.response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const borrowBookAction = createAsyncThunk(
  NAME_CONSTANT.BORROW_BOOK,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_ROUTES.BORROW_BOOK, {
        userId: data.userId,
        id: data.id,
      });
      console.log("response borrow book", response.data.response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const returnBookAction = createAsyncThunk(
  NAME_CONSTANT.RETURN_BOOK,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_ROUTES.RETURN_BOOK, {
        ...data,
      });
      console.log('response return book', response.data.response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const bookDetailsAction = createAsyncThunk(
  NAME_CONSTANT.BOOK_DETAILS,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`${API_ROUTES.BOOK_DETAILS}/${data.id}`);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

