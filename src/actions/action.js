import { ADD_USER, REMOVE_USER, ADD_PRODUCT } from "./actionType";

const addUser = payload => {
  return { type: ADD_USER, payload: payload };
};
const removeUser = () => {
  return { type: REMOVE_USER, payload: null };
};
const addProduct = payload => {
  return { type: ADD_PRODUCT, payload: payload };
};

export { addUser, removeUser, addProduct };
