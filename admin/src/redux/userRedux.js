import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
    isFetching: false,
    success: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.success= false;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.success= true;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.success= false;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    deleteUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },


    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload
    },
    getUserFailure: (state) => {
      state.error = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure, getUserFailure, getUserStart, getUserSuccess, updateUserSuccess, updateUserFailure, updateUserStart } = userSlice.actions;
export default userSlice.reducer;
