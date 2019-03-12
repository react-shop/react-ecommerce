import { createAction } from "redux-actions";
import { 
  ADD_TO_CART,
  REMOVE_TO_CART,
  CLEAN_CART,
  ATT_CART,
  CLOSE_CART
} from "./action-types";

export const addToCart = createAction(ADD_TO_CART);
export const removeToCart = createAction(REMOVE_TO_CART);
export const cleanCart = createAction(CLEAN_CART);
export const attCart = createAction(ATT_CART);
export const closeCart = createAction(CLOSE_CART);