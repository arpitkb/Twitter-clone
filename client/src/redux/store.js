import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Cookies } from "react-cookie";

import thunk from "redux-thunk";
import rootReducer from "./reduxers";
const cookies = new Cookies();

if (!cookies.get("_token")) localStorage.removeItem("twitter_user");

const userFromLocal = localStorage.getItem("twitter_user")
  ? JSON.parse(localStorage.getItem("twitter_user"))
  : null;

const initialState = {
  modal: {
    isReply: false,
  },
  auth: {
    user: userFromLocal,
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
