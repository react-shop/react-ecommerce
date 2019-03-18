import { createAction } from "redux-actions";
import { 
  ITEMS_UPDATED,
  REMOVE_TO_CART,
  CLEAN_CART,
  ATT_CART,
  SHOW,
  ADD_ID_TO_CART,
  CART_ITEMS,
  UPDATED_TOTAL_PRICE
} from "./action-types";

export const itemsUpdated = createAction(ITEMS_UPDATED);
export const removeToCart = createAction(REMOVE_TO_CART);
export const cleanCart = createAction(CLEAN_CART);
export const attCart = createAction(ATT_CART);
export const show = createAction(SHOW);
export const addIdToCart = createAction(ADD_ID_TO_CART);
export const cartItems = createAction(CART_ITEMS);
export const updatedTotalPrice = createAction(UPDATED_TOTAL_PRICE);