import { TOGGLE_REPLY_MODAL } from "../actions/types";

export const modalReducer = (state = { isReply: false }, action) => {
  const { type, payload } = action;
  switch (type) {
    case TOGGLE_REPLY_MODAL:
      return {
        isReply: !state.isReply,
      };
    default:
      return state;
  }
};
