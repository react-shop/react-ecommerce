import { SIGN_IN, SIGN_OUT } from "./action-types";

const INITIAL_STATE = {
  logged: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        logged: true
      };
    }
    case SIGN_OUT: {
        return {
          ...state,
          logged: false
        };
      }
    default:
      return state;
  }
}
