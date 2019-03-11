import { createAction } from "redux-actions";
import { 
  LIST_PRODUCTS_REQUESTED, 
  LIST_PRODUCTS_FULFILLED, 
  LIST_PRODUCTS_REJECTED,
  DETAIL_PRODUCT_REQUESTED,
  DETAIL_PRODUCT_FULFILLED,
  DETAIL_PRODUCT_REJECTED,
  ATT_PRODUCTS
} from "./action-types";

export const listProductsRequest = createAction(LIST_PRODUCTS_REQUESTED);
export const listProductsFulfilled = createAction(LIST_PRODUCTS_FULFILLED);
export const listProductsRejected = createAction(LIST_PRODUCTS_REJECTED);

export const detailProductRequest = createAction(DETAIL_PRODUCT_REQUESTED);
export const detailProductFulfilled = createAction(DETAIL_PRODUCT_FULFILLED);
export const detailProductRejected = createAction(DETAIL_PRODUCT_REJECTED);

export const attProducts = createAction(ATT_PRODUCTS);