import { 
  ADD_TO_CART,
  REMOVE_TO_CART,
  CLEAN_CART,
  ATT_CART,
  CLOSE_CART
} from "./action-types";

const INITIAL_STATE = {
  list: [],
  show: false,
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Esse vai ser o de início
    case ADD_TO_CART: {
      return {
        ...state,
        show: true,
        list: [...state.list, action.payload]
      };
    }
    case ATT_CART: {
      return {
        ...state,
        show: true,
        list: action.payload
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
