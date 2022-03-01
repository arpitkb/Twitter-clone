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
} from "./types";
import api from "../../utils/api";

export const createPost = (content, images) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_POST_REQ,
    });

    const { data } = await api.post("/api/post", { content, images });
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

export const getAllPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_POSTS_REQ,
    });
    const { data } = await api.get("/api/post");
    // console.log(data);
    dispatch({
      type: GET_ALL_POSTS_SUCC,
      payload: data,
    });
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
