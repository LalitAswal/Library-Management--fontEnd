import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import {
  loginReducer,
  registrationReducer,
} from "../features/slice/authSlice.js";
import { thunk } from "redux-thunk";
import {
  allBooksReducer,
  borrowBookReducer,
  returnBookReducer,
  searchBookReducer,
  bookDetailsReducer,
} from "../features/slice/bookSlice.js";
import {
  allUserReducer,
  addBulkUserReducer,
  deleteUserReducer,
} from "../AdminFeatures/slice/adminAuthSlice.js";
import {
  addBookReducer,
  uploadBookReducer,
  bulkAddBookReducer,
} from "../AdminFeatures/slice/adminBookSlice.js";

const store = configureStore({
  reducer: {
    login: loginReducer,
    register: registrationReducer,
    allBooks: allBooksReducer,
    borrowBook: borrowBookReducer,
    returnBook: returnBookReducer,
    bookDetails: bookDetailsReducer,
    searchBook: searchBookReducer,

    // admin reducer
    allUser: allUserReducer,
    addBulkUser: addBulkUserReducer,
    deleteUser: deleteUserReducer,
    addBook: addBookReducer,
    uploadBook: uploadBookReducer,
    bulkAddBook: bulkAddBookReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
