import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../../services/axios.js";
import NAME_CONSTANT from "../nameConstant/nameConstant.js";
import API_ROUTES from "../apiConstants/apiConstant";

export const allBooksAction = createAsyncThunk(
  NAME_CONSTANT.ALL_BOOKS,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_ROUTES.ALL_BOOKS, {
        ...data,
      });
      console.log('response all books', response.data.response);
      return response;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const borrowBookAction  = createAsyncThunk(
  NAME_CONSTANT.BORROW_BOOK,
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post(API_ROUTES.BORROW_BOOK, {
        ...data,
      });
      console.log('response borrow book', response.data.response);
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
