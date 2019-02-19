import { createAction } from "redux-actions";
import { SIGN_IN_REQUESTED, SIGN_IN_FULFILLED, SIGN_IN_REJECTED ,SIGN_OUT } from "./action-types";

export const signInRequest = createAction(SIGN_IN_REQUESTED);
export const signInFulfilled = createAction(SIGN_IN_FULFILLED);
export const signInRejected = createAction(SIGN_IN_REJECTED);
export const signOut = createAction(SIGN_OUT)