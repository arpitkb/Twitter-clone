import React, { useState, useEffect } from "react";
import Feed from "../components/Feed";
import Modal from "../components/Modal";
import { Route, Routes, useLocation, useSearchParams } from "react-router-dom";
import CreateTweetModal from "../components/CreateTweetModal";

import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../redux/actions/post";
import Widgets from "../components/Widgets";

const HomeScreen = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const { loading, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  return (
    <>
      <Feed posts={posts} loading={loading} />
      {/* <Widgets /> */}
      {location.pathname.split("/")[2] === "compose" && <CreateTweetModal />}
      {/* <Routes>
        <Route path='/compose' element={<CreateTweetModal />} />
      </Routes> */}
      {/* <Feed /> */}
    </>
  );
};

export default HomeScreen;
