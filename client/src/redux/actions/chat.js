import {
  CREATE_CHAT_ERR,
  CREATE_CHAT_REQ,
  CREATE_CHAT_SUCC,
  GET_CHATLIST_ERR,
  GET_CHATLIST_REQ,
  GET_CHATLIST_SUCC,
} from "./types";
import api from "../../utils/api";

export const createChat = (users, chatName, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CHAT_REQ,
    });
    const { data } = await api.post("/api/chat", { users, chatName });
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
    dispatch({
      type: GET_CHATLIST_ERR,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.message,
    });
  }
};
