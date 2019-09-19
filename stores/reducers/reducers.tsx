import { combineReducers } from "redux-immutable";
import userReducer from "./user.reducer";

const reducer = combineReducers({
  user: userReducer,
});

export default reducer;
