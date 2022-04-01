import {
  CREATE_POST_ERR,
  CREATE_POST_REQ,
  CREATE_POST_SUCC,
  GET_ALL_POSTS_ERR,
  GET_ALL_POSTS_REQ,
  GET_ALL_POSTS_SUCC,
  GET_POST_ERR,
  GET_POST_REQ,
  GET_POST_SUCC,
  LIKE_POST_ERR,
  LIKE_POST_SUCC,
  LIKE_POST_SUCC2,
  RETWEET_POST_ERR,
  RETWEET_POST_SUCC,
  RETWEET_POST_SUCC2,
  CREATE_REPLY_REQ,
  CREATE_REPLY_ERR,
  CREATE_REPLY_SUCC,
  DELETE_POST_ERR,
  DELETE_POST_REQ,
  DELETE_POST_SUCC,
  COMMENT_NUMBER_HANDLER,
  CLEAR_ALL,
} from "./types";
import api from "../../utils/api";

export const createPost =
  (content, images, replyTo = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CREATE_POST_REQ,
      });

      const { data } = await api.post("/api/post", {
        content,
        images,
        replyTo,
      });
      // console.log(data);

      dispatch({
        type: CREATE_POST_SUCC,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: CREATE_POST_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_POST_REQ,
    });

    const { data } = await api.delete(`/api/post/${id}`);

    dispatch({
      type: DELETE_POST_SUCC,
      payload: id,
    });

    if (data.replyTo) {
      dispatch({
        type: COMMENT_NUMBER_HANDLER,
        payload: {
          id: data.replyTo,
          add: -1,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: DELETE_POST_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const createReply =
  (content, images, replyTo = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CREATE_REPLY_REQ,
      });

      const { data } = await api.post("/api/post", {
        content,
        images,
        replyTo,
      });
      // console.log(data);

      dispatch({
        type: CREATE_REPLY_SUCC,
        payload: data,
      });

      if (replyTo) {
        dispatch({
          type: COMMENT_NUMBER_HANDLER,
          payload: {
            id: replyTo,
            add: 1,
          },
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: CREATE_REPLY_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const clearFeedPosts = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ALL,
  });
};

export const getAllPosts =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_ALL_POSTS_REQ,
      });
      const { data } = await api.get(`/api/post?page=${page}`);
      // console.log(data);
      if (data.length === 0) {
        dispatch({
          type: GET_ALL_POSTS_SUCC,
          payload: { posts: data, hasMore: false },
        });
      } else {
        dispatch({
          type: GET_ALL_POSTS_SUCC,
          payload: { posts: data, hasMore: true },
        });
      }
    } catch (err) {
      dispatch({
        type: GET_ALL_POSTS_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_POST_REQ,
    });

    const { data } = await api.get(`/api/post/${id}`);
    dispatch({
      type: GET_POST_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_POST_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const likePost = (postId, userId, ilbm, post) => async (dispatch) => {
  try {
    if (post) {
      dispatch({
        type: LIKE_POST_SUCC2,
        payload: {
          postId,
          userId,
          ilbm,
        },
      });
    } else {
      dispatch({
        type: LIKE_POST_SUCC,
        payload: {
          postId,
          userId,
          ilbm,
        },
      });
    }
    await api.put(`/api/post/${postId}/toggleLike`);
  } catch (err) {
    console.log(err);
    dispatch({
      type: LIKE_POST_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const toggleRetweet =
  (postId, userId, selfId, ir, post) => async (dispatch) => {
    try {
      await api.post(`/api/post/${postId}/toggleRetweet`);
      if (post) {
        dispatch({
          type: RETWEET_POST_SUCC2,
          payload: {
            postId,
            userId,
            selfId,
            ir,
          },
        });
      } else {
        dispatch({
          type: RETWEET_POST_SUCC,
          payload: {
            postId,
            userId,
            selfId,
            ir,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: RETWEET_POST_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };
