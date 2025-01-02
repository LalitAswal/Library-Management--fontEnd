import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { loginReducer } from '../features/slice/authSlice.js';
import { thunk } from 'redux-thunk';


const store = configureStore({
  reducer: {
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
