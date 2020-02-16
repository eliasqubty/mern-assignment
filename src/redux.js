import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import productReducer  from "./reducers/productReducer";
let allreducer = combineReducers({
  userReducer,
  productReducer
});
let store = createStore(allreducer);

export default store;
