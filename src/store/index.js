import {configureStore, createSlice} from "@reduxjs/toolkit";

const userslice = createSlice({
    name:"user",
    initialState: {isloggedin: false},
    reducers: {
        login(state) {
            state.isloggedin = true;
        },
        logout(state) {
            localStorage.removeItem("userid");
            state.isloggedin = false;
        }
    }
});

const adminslice = createSlice({
    name: "admin",
    initialState: {isloggedin: false},
    reducers: {
        login(state) {
            state.isloggedin = true;
        },
        logout(state) {
            localStorage.removeItem("adminid");
            localStorage.removeItem("token");
            state.isloggedin = false;
        }
    }
});

export const useractions = userslice.actions;
export const adminactions = adminslice.actions;

export const store = configureStore({
    reducer: {
        user: userslice.reducer,
        admin: adminslice.reducer
    }
});