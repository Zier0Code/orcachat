import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
import customerAuthReducer from './customerAuthSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        c_auth: customerAuthReducer,
    },
});