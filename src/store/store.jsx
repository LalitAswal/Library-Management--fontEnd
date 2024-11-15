import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import authReducer from "../features/auth/authSlice.js";

const store = configureStore({
    reducer: {
        auth: authReducer
    },
    middleware: [thunk],

});


export default store;