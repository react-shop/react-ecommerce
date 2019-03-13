import { createAction } from "redux-actions";
import { 
  ITEMS_UPDATED,
  REMOVE_TO_CART,
  CLEAN_CART,
  ATT_CART,
  CLOSE_CART,
  ADD_ID_TO_CART
} from "./action-types";

export const itemsUpdated = createAction(ITEMS_UPDATED);
export const removeToCart = createAction(REMOVE_TO_CART);
export const cleanCart = createAction(CLEAN_CART);
export const attCart = createAction(ATT_CART);
export const closeCart = createAction(CLOSE_CART);
export const addIdToCart = createAction(ADD_ID_TO_CART);