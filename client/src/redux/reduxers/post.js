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
  GET_USER_POSTS_ERR,
  GET_USER_POSTS_REQ,
  GET_USER_POSTS_SUCC,
  LIKE_POST_SUCC,
  LIKE_POST_SUCC2,
  RETWEET_POST_SUCC,
  RETWEET_POST_SUCC2,
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
        loading: false,
      };
    }
    default:
      return state;
  }
};

export const postsReducer = (state = { posts: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_POSTS_REQ:
    case GET_ALL_POSTS_REQ:
      return {
        ...state,
        loading: true,
        err: null,
      };
    case GET_USER_POSTS_SUCC:
    case GET_ALL_POSTS_SUCC:
      return {
        loading: false,
        posts: payload,
      };
    case GET_USER_POSTS_ERR:
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
    case LIKE_POST_SUCC:
      return {
        ...state,
        posts: state.posts.map((el) => {
          if (el._id === payload.postId) {
            if (payload.ilbm)
              el.likes = el.likes.filter((el) => el !== payload.userId);
            else el.likes.push(payload.userId);
          }
          return el;
        }),
      };
    case RETWEET_POST_SUCC:
      return {
        ...state,
        posts: state.posts.map((el) => {
          if (el._id === payload.postId) {
            if (payload.ir)
              el.retweetUsers = el.retweetUsers.filter(
                (e) => e !== payload.userId
              );
            else el.retweetUsers.push(payload.userId);
          } else if (el._id === payload.selfId) {
            el.retweetPost.retweetUsers = el.retweetPost.retweetUsers.filter(
              (k) => k !== payload.userId
            );
          }
          return el;
        }),
      };
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

    case LIKE_POST_SUCC2:
      return {
        ...state,
        post: {
          ...state.post,
          likes: payload.ilbm
            ? state.post.likes.filter((el) => el !== payload.userId)
            : [payload.userId, ...state.post.likes],
        },
      };
    case RETWEET_POST_SUCC2:
      return {
        ...state,
        post: {
          ...state.post,
          retweetUsers: payload.ir
            ? state.post.retweetUsers.filter((el) => el !== payload.userId)
            : [payload.userId, ...state.post.retweetUsers],
        },
      };
    case CLEAR_ALL:
      return {};
    default:
      return state;
  }
};
