import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    customer: null,
};

const customerAuthSlice = createSlice({
    name: 'c_auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.customer = action.payload;
        },
        logout: (state) => {
            state.customer = null
        },
    },
});


export const { login, logout } = customerAuthSlice.actions;

export default customerAuthSlice.reducer;
