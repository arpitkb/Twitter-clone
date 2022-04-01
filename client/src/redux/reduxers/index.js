import { combineReducers } from "redux";
import { modalReducer } from "./modal";
import { authReducer } from "./auth";
import {
  createPostReducer,
  postsReducer,
  postReducer,
  userPostsReducer,
} from "./post";
import { profileReducer, userListReducer, usersReducer } from "./user";
import { chatsReducer } from "./chat";

export default combineReducers({
  modal: modalReducer,
  auth: authReducer,
  createPost: createPostReducer,
  posts: postsReducer,
  post: postReducer,
  profile: profileReducer,
  users: usersReducer,
  userList: userListReducer,
  userPosts: userPostsReducer,
  chats: chatsReducer,
});
