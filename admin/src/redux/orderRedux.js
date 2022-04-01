import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getOrderStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getOrderSuccess: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;
    },
    getOrderFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateOrderStart: (state) => {
        state.isFetching = true;
        state.error = false;
    },
    updateOrderSuccess: (state, action) => {
        state.isFetching = false;
        const orderIndex = state.orders.findIndex((order) => order._id === action.payload);
        state.orders[orderIndex].status = action.payload.sttx
    },
    updateOrderFailure: (state) => {
        state.isFetching = false;
        state.error = true;
    },
  },
});

export const {  
    getOrderStart, 
    getOrderSuccess, 
    getOrderFailure, 
    updateOrderStart, 
    updateOrderSuccess, 
    updateOrderFailure
} = orderSlice.actions;

export default orderSlice.reducer;
