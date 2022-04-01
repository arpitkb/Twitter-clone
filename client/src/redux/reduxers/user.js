import {
  GET_USER_PROFILE_ERR,
  GET_USER_PROFILE_SUCC,
  GET_USER_PROFILE_REQ,
  GET_USER_POSTS_REQ,
  GET_USER_POSTS_SUCC,
  GET_USER_POSTS_ERR,
  LIKE_POST_SUCC,
  GET_USERS_BY_KEYWORD_SUCC,
  GET_USERS_BY_KEYWORD_REQ,
  GET_USERS,
  GET_USERS_BY_KEYWORD_ERR,
  GET_USERS_ERR,
  GET_USERS_REQ,
  GET_USERS_SUCC,
  CLEAR_USER_POSTS,
} from "../actions/types";

export const profileReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_PROFILE_REQ:
      return {
        loading: true,
        err: null,
      };
    case GET_USER_PROFILE_SUCC:
      return {
        loading: false,
        profile: payload,
      };
    case GET_USER_PROFILE_ERR:
      return {
        loading: false,
        err: payload,
      };
    default:
      return state;
  }
};

export const usersReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS_BY_KEYWORD_REQ:
      return {
        loading: true,
      };
    case GET_USERS_BY_KEYWORD_SUCC:
      return {
        loading: false,
        users: payload,
      };
    case GET_USERS_BY_KEYWORD_ERR:
      return {
        loading: false,
        err: payload,
        users: [],
      };
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS_REQ:
      return {
        loading: true,
      };
    case GET_USERS_SUCC:
      return {
        users: payload,
      };
    case GET_USERS_ERR:
      return {
        err: payload,
      };
    default:
      return state;
  }
};
