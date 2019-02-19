import { combineReducers } from "redux";
import auth from "./auth/reducers"

const appReducer = combineReducers({
  auth
});

export default (state, action) => appReducer(state, action);
