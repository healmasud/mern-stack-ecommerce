import { createSlice } from "@reduxjs/toolkit";

export const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    mails: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getMailStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getMailSuccess: (state, action) => {
      state.isFetching = false;
      state.mails = action.payload;
    },
    getMailFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
    getMailStart,
    getMailSuccess,
    getMailFailure
} = newsletterSlice.actions;

export default newsletterSlice.reducer;
