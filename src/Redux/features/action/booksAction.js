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
      console.log('response all books', response.data.response);
      return response;
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
    console.log('data borrowBookAction', data);
    console.log('data.userId borrowBookAction', data.userId);
    console.log('data.id borrowBookAction', data.id);
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
      console.log("checking data bookDetailsAction", data);
      const response = await axiosClient.get(`${API_ROUTES.BOOK_DETAILS}/${data.id}`);
      console.log("response book details", response.data.response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

