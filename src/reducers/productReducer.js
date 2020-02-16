import { ADD_PRODUCT } from "../actions/actionType";
let productReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return [...action.payload];
    default:
      return state;
  }
};
export default productReducer;
