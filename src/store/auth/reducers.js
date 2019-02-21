import { SIGN_IN_REQUESTED, SIGN_IN_FULFILLED, SIGN_IN_REJECTED, SIGN_OUT } from "./action-types";

const INITIAL_STATE = {
  logged: false,
  loading: false,
  user: null,
  error: null,
  token: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // Esse vai ser o de início
    case SIGN_IN_REQUESTED: {
      return {
        ...state,
        loading: true,
        logged: false,
        user: null,
        error: null
      };
    }
    // Esse vai ser o de sucesso
    case SIGN_IN_FULFILLED: {
      return {
        ...state,
        loading: false,
        logged: true,
        user: action.payload,
        error: null,
        token: action.payload.auth_token
      };
    }
    // Esse vai ser o de erro
    case SIGN_IN_REJECTED: {
      return {
        ...INITIAL_STATE,
        error: action.payload
      };
    }
    // Esse vai ser o de saída
    case SIGN_OUT: {
        return {
            ...INITIAL_STATE,
        };
      }
    default:
      return state;
  }
}
