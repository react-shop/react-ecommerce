import { combineReducers } from "redux";
import auth from "./auth/reducers"
import {reducer as formReducer} from 'redux-form';

const appReducer = combineReducers({
  auth,
  form: formReducer
});

export default (state, action) => appReducer(state, action);
