import { createAction } from "redux-actions";
import { LIST_PRODUCTS_REQUESTED, LIST_PRODUCTS_FULFILLED, LIST_PRODUCTS_REJECTED } from "./action-types";

export const listProductsRequest = createAction(LIST_PRODUCTS_REQUESTED);
export const listProductsFulfilled = createAction(LIST_PRODUCTS_FULFILLED);
export const listProductsRejected = createAction(LIST_PRODUCTS_REJECTED);