import { 
  ITEMS_UPDATED,
  CLEAN_CART,
  ATT_CART,
  SHOW,
  ADD_ID_TO_CART,
  CART_ITEMS
} from "./action-types";

const INITIAL_STATE = {
  id: null,
  items: null,
  show: false,
  length: 0
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Esse vai ser o de início
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
    default:
      return state;
  }
}
