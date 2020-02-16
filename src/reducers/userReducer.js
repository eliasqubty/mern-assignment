import { ADD_USER, REMOVE_USER} from "../actions/actionType";
let userReducer = (state = null, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case REMOVE_USER:
      return action.payload
    default:
      return state;
  }
};
export default userReducer;
