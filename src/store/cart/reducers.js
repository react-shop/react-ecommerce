import { 
  ITEMS_UPDATED,
  CLEAN_CART,
  ATT_CART,
  CLOSE_CART,
  ADD_ID_TO_CART
} from "./action-types";

const INITIAL_STATE = {
  id: null,
  items: null,
  show: false,
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
    case ATT_CART: {
      return {
        ...state,
        show: true,
        items: action.payload
      }
    }
    case CLOSE_CART: {
      return {
        ...state,
        show: false
      }
    }
    default:
      return state;
  }
}
