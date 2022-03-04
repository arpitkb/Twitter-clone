import {
  SIGNUP_ERR,
  SIGNUP_REQ,
  SIGNUP_SUCC,
  LOGIN_ERR,
  LOGIN_REQ,
  LOGIN_SUCC,
  LOGOUT,
  CLEAR_ALL,
  LIKE_POST_SUCC,
  LOAD_USER,
  TOGGLE_FOLLOW_SUCC,
  RETWEET_POST_SUCC,
  LIKE_POST_SUCC2,
  RETWEET_POST_SUCC2,
} from "../actions/types";

export const authReducer = (state = {}, action) => {
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
    case TOGGLE_FOLLOW_SUCC:
      if (state.user.following.includes(payload)) {
        return {
          ...state,
          user: {
            ...state.user,
            following: state.user.following.filter((el) => el !== payload),
          },
        };
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            following: [payload, ...state.user.following],
          },
        };
      }
    case LIKE_POST_SUCC2:
    case LIKE_POST_SUCC:
      if (payload.ilbm) {
        return {
          ...state,
          user: {
            ...state.user,
            likes: state.user.likes.filter((el) => el !== payload.postId),
          },
        };
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            likes: [payload.postId, ...state.user.likes],
          },
        };
      }
    case RETWEET_POST_SUCC2:
    case RETWEET_POST_SUCC:
      if (state.user.retweets.includes(payload.postId)) {
        return {
          ...state,
          user: {
            ...state.user,
            retweets: state.user.retweets.filter((el) => el !== payload.postId),
          },
        };
      } else {
        return {
          ...state,
          user: {
            ...state.user,
            retweets: [payload.postId, ...state.user.retweets],
          },
        };
      }

    case LOGOUT:
      return {};
    case LOAD_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
