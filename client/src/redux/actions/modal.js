import { TOGGLE_REPLY_MODAL } from "./types";

export const setreplymodal = () => (dispatch) => {
  dispatch({
    type: TOGGLE_REPLY_MODAL,
  });
};
