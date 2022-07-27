import {
  ADD_MESSAGE,
  ADD_MESSAGE_ERR,
  CREATE_CHAT_ERR,
  CREATE_CHAT_REQ,
  CREATE_CHAT_SUCC,
  GET_CHATLIST_ERR,
  GET_CHATLIST_REQ,
  GET_CHATLIST_SUCC,
  GET_CHAT_ERR,
  GET_CHAT_REQ,
  GET_CHAT_SUCC,
  GET_MESSAGES_ERR,
  GET_MESSAGES_REQ,
  GET_MESSAGES_SUCC,
} from "./types";
import api from "../../utils/api";

export const createChat = (users, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CHAT_REQ,
    });
    const { data } = await api.post("/api/chat", { users });
    dispatch({
      type: CREATE_CHAT_SUCC,
      payload: data,
    });
    navigate(`/messages/${data._id}`);
  } catch (err) {
    dispatch({
      type: CREATE_CHAT_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getChatList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CHATLIST_REQ,
    });
    const { data } = await api.get("/api/chat");

    dispatch({
      type: GET_CHATLIST_SUCC,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_CHATLIST_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getChat = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CHAT_REQ,
    });

    const { data } = await api.get(`/api/chat/${id}`);

    dispatch({
      type: GET_CHAT_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_CHAT_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const addMessage = (msg) => async (dispatch) => {
  try {
    // const { data } = await api.post(`/api/message`, { content, chatId });

    dispatch({
      type: ADD_MESSAGE,
      payload: msg,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_MESSAGE_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};

export const getMessages = (chatId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_MESSAGES_REQ,
    });
    const { data } = await api.get(`/api/message/${chatId}`);

    dispatch({
      type: GET_MESSAGES_SUCC,
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: GET_MESSAGES_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};
