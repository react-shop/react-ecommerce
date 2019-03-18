import { 
  ITEMS_UPDATED,
  CLEAN_CART,
  ATT_CART,
  SHOW,
  ADD_ID_TO_CART,
  CART_ITEMS,
  UPDATED_TOTAL_PRICE
} from "./action-types";

const INITIAL_STATE = {
  id: null,
  items: null,
  show: false,
  length: 0,
  total: 0.00
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ITEMS_UPDATED: {
      return {
        ...state,
        show: true,
        items: action.payload
      };
    }
    case ADD_ID_TO_CART: {
      return {
        ...state,
        id: action.payload,
      }
    }
    case CART_ITEMS: {
      return {
        ...state,
        length: action.payload
      }
    }
    case ATT_CART: {
      return {
        ...state,
        show: true,
        items: action.payload
      }
    }
    case SHOW: {
      return {
        ...state,
        show: action.payload
      }
    }
    case UPDATED_TOTAL_PRICE: {
      return {
        ...state,
        total: action.payload
      }
    }
    default:
      return state;
  }
}
