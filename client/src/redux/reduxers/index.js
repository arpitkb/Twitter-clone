import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import { authReducer } from "./auth";
import { createPostReducer, postsReducer, postReducer } from "./post";
import { profileReducer ,usersReducer} from "./user";

export default combineReducers({
  modal: modalReducer,
  auth: authReducer,
  createPost: createPostReducer,
  posts: postsReducer,
  post: postReducer,
  profile: profileReducer,
  users : usersReducer
});
