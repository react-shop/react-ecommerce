import { 
  LIST_PRODUCTS_REQUESTED, 
  LIST_PRODUCTS_FULFILLED, 
  LIST_PRODUCTS_REJECTED,
  DETAIL_PRODUCT_REQUESTED,
  DETAIL_PRODUCT_FULFILLED,
  DETAIL_PRODUCT_REJECTED
} from "./action-types";

const INITIAL_STATE = {
  logged: false,
  loading: false,
  list: null,
  error: null,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Esse vai ser o de início
    case LIST_PRODUCTS_REQUESTED:
    case DETAIL_PRODUCT_REQUESTED: {
      return {
        ...state,
        loading: true,
        list: null,
        error: null
      };
    }
    // Esse vai ser o de sucesso
    case LIST_PRODUCTS_FULFILLED:
    case DETAIL_PRODUCT_FULFILLED: {
      return {
        ...state,
        loading: false,
        list: action.payload,
        error: null
      };
    }
    // Esse vai ser o de erro
    case LIST_PRODUCTS_REJECTED:
    case DETAIL_PRODUCT_REJECTED: {
      return {
        ...INITIAL_STATE,
        error: action.payload
      };
    }
    default:
      return state;
  }
}
