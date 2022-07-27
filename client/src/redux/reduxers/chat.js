import {
  ADD_MESSAGE,
  ADD_MESSAGE_ERR,
  CREATE_CHAT_ERR,
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
    case CREATE_CHAT_ERR:
    case GET_CHATLIST_ERR:
      return {
        ...state,
        err: payload,
        loading: false,
      };
    case CREATE_CHAT_SUCC:
      return {
        chats: [payload, ...state.chats.filter((el) => el._id !== payload._id)],
      };
    default:
      return state;
  }
};

export const chatReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CHAT_REQ:
      return {
        loading: true,
      };
    case GET_CHAT_SUCC:
      return {
        loading: false,
        chat: payload,
      };
    case GET_CHAT_ERR:
      return {
        loading: false,
        err: payload,
      };
    default:
      return state;
  }
};

export const messagesReducer = (state = { messages: [] }, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_MESSAGES_REQ:
      return {
        loading: true,
      };
    case GET_MESSAGES_SUCC:
      return {
        loading: false,
        messages: payload,
      };
    case GET_MESSAGES_ERR:
      return {
        loading: false,
        err: payload,
      };
    case ADD_MESSAGE:
      return {
        messages: [...state.messages, payload],
      };
    case ADD_MESSAGE_ERR:
      return {
        ...state,
        err: "message not sent",
      };
    default:
      return state;
  }
};
