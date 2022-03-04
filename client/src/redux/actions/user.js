import {
  GET_USER_PROFILE_SUCC,
  GET_USER_PROFILE_ERR,
  GET_USER_PROFILE_REQ,
  GET_USER_POSTS_ERR,
  GET_USER_POSTS_REQ,
  GET_USER_POSTS_SUCC,
  TOGGLE_FOLLOW_SUCC,
  LOAD_USER,
  GET_USERS_BY_KEYWORD_SUCC,
  GET_USERS_BY_KEYWORD_ERR,
  GET_USERS_BY_KEYWORD_REQ
} from "./types";

import api from "../../utils/api";

export const getUserProfile = (username) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_PROFILE_REQ,
    });

    const { data } = await api.get(`/api/user/${username}`);

    dispatch({
      type: GET_USER_PROFILE_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_PROFILE_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getUserPosts = (username) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_POSTS_REQ,
    });

    const { data } = await api.get(`/api/user/${username}/posts`);

    dispatch({
      type: GET_USER_POSTS_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_POSTS_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};
export const getUserLikedPosts = (username) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_POSTS_REQ,
    });

    const { data } = await api.get(`/api/user/${username}/posts/liked`);

    dispatch({
      type: GET_USER_POSTS_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_POSTS_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const toggleFollow = (id) => async (dispatch) => {
  try {
    dispatch({
      type: TOGGLE_FOLLOW_SUCC,
      payload: id,
    });
    await api.put(`/api/user/${id}/toggleFollow`);
  } catch (err) {
    console.log(err.message);
  }
};


export const getUsersByKeyword = (keyword)=>async dispatch=>{
  try {
    dispatch({
      type : GET_USERS_BY_KEYWORD_REQ
    })

    const {data} = await api.get(`/api/user?keyword=${keyword}`);

    dispatch({
      type : GET_USERS_BY_KEYWORD_SUCC,
      payload : data
    })
    
  } catch (err) {
     dispatch({
      type: GET_USERS_BY_KEYWORD_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
}