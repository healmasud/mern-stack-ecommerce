import { loginFailure, loginStart, loginSuccess, deleteUserStart, deleteUserSuccess, deleteUserFailure, getUserFailure, getUserStart, getUserSuccess, updateUserSuccess, updateUserFailure, updateUserStart } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductSuccess8,
  addProductFailure,
  addProductStart,
  addProductSuccess
} from "./productRedux";
import {
  getOrderStart, getOrderSuccess, getOrderFailure, updateOrderStart, updateOrderSuccess, updateOrderFailure
} from "./orderRedux"
import {getMailStart, getMailSuccess, getMailFailure} from "./newsletterRedux"


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};


export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await publicRequest.get("/orders");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const getMails = async (dispatch) => {
  dispatch(getMailStart());
  try {
    const res = await publicRequest.get("/mails");
    dispatch(getMailSuccess(res.data));
  } catch (err) {
    dispatch(getMailFailure());
  }
};



export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data)); 
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUser = async (id, dispatch) => {
  dispatch(deleteUserStart());
  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(res.data));
    window.location.reload(false)
  } catch (err) {
    dispatch(deleteUserFailure());
  }
};

export const updateUser = async (id, ad, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, {_id: id, isAdmin: ad});
    dispatch(updateProductSuccess8(id, ad));
    window.location.reload(false)
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const updateOrder = async (id, stt, dispatch) => {
  dispatch(updateOrderStart());
  try {           
    let sttx = "Pending"
    if (stt === "Pending") {
      sttx = "Delivered" 
    } else { sttx = "Pending" }
    const res = await userRequest.put(`/orders/${id}`, {_id: id, status: sttx});
    dispatch(updateOrderSuccess(id, sttx));
    window.location.reload(false)
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};




export const getUser = async (id, dispatch) => {
  let usern
  try {
    const res = await userRequest.get(`/users/find/${id}`);
    usern = await res.data.username
  } catch (err) {
  }
  return usern
};


export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(res.data));
    window.location.reload(false)
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(updateProductSuccess8(res.data));
    window.location.reload(false)
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const updatePrd = async (dispatch, id, name, desc, price, category, color, size, status) => {
  dispatch(updateProductStart())
  try {
    let stt = false;
    if (status.inStock === "true") {
      stt = true 
    } else {stt = false}
    const res = await publicRequest.put("/auth/updatePrd", {
      id: id, 
      name: name,
      desc: desc,
      price: price,
      category: category,
      color: color,
      size: size,
      status: stt,
    });
    dispatch(updateProductSuccess({
      id, 
      name,
      desc,
      price,
      category, 
      color,
      size,
      stt
    }))
  } catch (err) {
    dispatch(updateProductFailure())
  }
};

export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    window.location.reload(false)
  } catch (err) {
    dispatch(addProductFailure());
  }
};
