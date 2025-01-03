import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { loginReducer, registrationReducer } from '../features/slice/authSlice.js';
import { thunk } from 'redux-thunk';
import { allBooksReducer } from '../features/slice/bookSlice.js';


const store = configureStore({
  reducer: {
    login: loginReducer,
    register:registrationReducer,
    allBooks: allBooksReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
