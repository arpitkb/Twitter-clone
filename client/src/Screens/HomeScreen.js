import React, { useState, useEffect } from "react";
import Feed from "../components/Feed";
import { useLocation } from "react-router-dom";
import CreateTweetModal from "../components/CreateTweetModal";

import { useSelector, useDispatch } from "react-redux";
import { clearFeedPosts, getAllPosts } from "../redux/actions/post";

const HomeScreen = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  // const [allPosts, setPosts] = useState([]);
  const { loading, posts, hasMore } = useSelector((state) => state.posts);

  const chngPage = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    dispatch(clearFeedPosts());
  }, []);

  useEffect(() => {
    dispatch(getAllPosts(page));
  }, [page]);
  return (
    <>
      <Feed
        posts={posts}
        hasMore={hasMore}
        loading={loading}
        chngPage={chngPage}
      />
      {location.pathname.split("/")[2] === "compose" && <CreateTweetModal />}
    </>
  );
};

export default HomeScreen;
