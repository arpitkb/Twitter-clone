import {
  CREATE_CHAT_SUCC,
  GET_CHATLIST_ERR,
  GET_CHATLIST_REQ,
  GET_CHATLIST_SUCC,
} from "../actions/types";

export const chatsReducer = (state = { chats: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CHATLIST_REQ:
      return {
        ...state,
        loading: true,
      };
    case GET_CHATLIST_SUCC:
      return {
        loading: false,
        chats: payload,
      };
    case GET_CHATLIST_ERR:
      return {
        ...state,
        err: payload,
        loading: false,
      };
    case CREATE_CHAT_SUCC:
      return {
        ...state,
        chats: [payload, ...state.chats],
      };
    default:
      return state;
  }
};
