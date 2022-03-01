import {
  SIGNUP_ERR,
  SIGNUP_REQ,
  SIGNUP_SUCC,
  LOGIN_ERR,
  LOGIN_REQ,
  LOGIN_SUCC,
  LOGOUT,
  CLEAR_ALL,
} from "./types";
import api from "../../utils/api";

import axios from "axios";

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("twitter_user");
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_ALL,
  });
};

export const loginUser =
  (email, password, username, fn) => async (dispatch) => {
    try {
      dispatch({
        type: LOGIN_REQ,
      });

      const { data } = await api.post("/api/auth/login", {
        email,
        password,
        username,
      });
      fn("_token", data.token, { path: "/", maxAge: 2 * 60 * 60 });
      localStorage.setItem("twitter_user", JSON.stringify(data.user));

      dispatch({
        type: LOGIN_SUCC,
        payload: data.user,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };

export const registerUser =
  (name, email, password, dob, fn) => async (dispatch) => {
    try {
      dispatch({
        type: SIGNUP_REQ,
      });

      const { data } = await api.post("/api/auth/register", {
        name,
        email,
        password,
        dob,
      });

      dispatch({
        type: SIGNUP_SUCC,
        payload: data.user,
      });
      fn("_token", data.token, { path: "/", maxAge: 2 * 60 * 60 });
      localStorage.setItem("twitter_user", JSON.stringify(data.user));
    } catch (err) {
      dispatch({
        type: SIGNUP_ERR,
        payload:
          err.response && err.response.data.msg
            ? err.response.data.msg
            : err.message,
      });
    }
  };