import {
  SIGNUP_ERR,
  SIGNUP_REQ,
  SIGNUP_SUCC,
  LOGIN_ERR,
  LOGIN_REQ,
  LOGIN_SUCC,
  LOGOUT,
} from "../actions/types";

export const authReducer = (state = { loading: true }, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNUP_REQ:
    case LOGIN_REQ:
      return {
        loading: true,
      };
    case SIGNUP_SUCC:
    case LOGIN_SUCC:
      return {
        loading: false,
        user: payload,
      };
    case SIGNUP_ERR:
    case LOGIN_ERR:
      return {
        loading: false,
        err: payload,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
