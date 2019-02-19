import { createAction } from "redux-actions";
import { SIGN_IN, SIGN_OUT } from "./action-types";

export const signIn = createAction(SIGN_IN);
export const signOut = createAction(SIGN_OUT)