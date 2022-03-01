import {
  CLEAR_ALL,
  CREATE_POST_ERR,
  CREATE_POST_REQ,
  CREATE_POST_SUCC,
  GET_ALL_POSTS_ERR,
  GET_ALL_POSTS_REQ,
  GET_ALL_POSTS_SUCC,
  GET_POST_ERR,
  GET_POST_REQ,
  GET_POST_SUCC,
} from "../actions/types";

export const createPostReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_POST_REQ:
      return {
        loading: true,
      };
    case CREATE_POST_SUCC: {
      return {
        loading: false,
      };
    }
    case CREATE_POST_ERR: {
      return {
        err: payload,
      };
    }
    default:
      return state;
  }
};

export const postsReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_POSTS_REQ:
      return {
        ...state,
        loading: true,
        err: null,
      };
    case GET_ALL_POSTS_SUCC:
      return {
        loading: false,
        posts: payload,
      };
    case GET_ALL_POSTS_ERR:
      return {
        err: payload,
      };
    case CREATE_POST_SUCC:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case CLEAR_ALL:
      return { posts: [] };
    default:
      return state;
  }
};

export const postReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST_REQ:
      return {
        loading: true,
      };
    case GET_POST_SUCC:
      return {
        loading: false,
        post: payload,
      };
    case GET_POST_ERR:
      return {
        loading: false,
        err: payload,
      };
    case CLEAR_ALL:
      return {};
    default:
      return state;
  }
};
