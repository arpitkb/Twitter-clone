import React, { useEffect, useState, useRef } from "react";
import Post from "../components/Post";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPost } from "../redux/actions/post";
import Loader from "../components/Loader";
import CreateReply from "../components/CreateReply";

const StatusScreen = () => {
  const navigate = useNavigate();
  const scrollToRef = useRef();

  const { tweetId } = useParams();
  const dispatch = useDispatch();
  const { loading, post, err } = useSelector((state) => state.post);
  const {
    loading: repliesLoading,
    posts: replies,
    err: repliesErr,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPost(tweetId));
  }, [tweetId]);

  useEffect(() => {
    if (scrollToRef.current) {
      const y = scrollToRef.current.getBoundingClientRect().height;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [loading]);

  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 md:min-w-[580px] max-w-[620px]'>
      <div className='backdrop-blur-[12px] bg-black bg-opacity-60 flex justify-start items-center px-3 py-2 text-[#d9d9d9] sticky top-0 z-50'>
        <div
          onClick={() => {
            navigate(-1);
          }}
          className='hoverAnim h-9 w-9 flex justify-center ms-0 items-center xl:px-0'
        >
          <ArrowLeftIcon className='h-5' />
        </div>
        <div className='font-bold text-xl mx-6'>Tweet</div>
      </div>
      {loading && (
        <div className='text-center'>
          <Loader />
        </div>
      )}

      <div>
        {/* Post which is the parent (if exists) of original post */}
        {!loading && (
          <div className='relative' ref={scrollToRef}>
            {post && post[1] && (
              <Post
                redirectOnDelete={true}
                str={true}
                postPage={false}
                post={post[1]}
              />
            )}
            <span className='w-[1.75px] h-full  z-[-1] absolute left-8 top-[3rem] bg-gray-700' />
          </div>
        )}

        {/* Original Post */}
        <div>
          {!loading && post && post[0] && (
            <Post redirectOnDelete={true} postPage={true} post={post[0]} />
          )}
        </div>
      </div>
      {!loading && err && (
        <div className='mx-auto text-center mt-10 text-[#6e767d]'>
          Hmm... {err}
        </div>
      )}

      {/* Reply form */}
      {post && post[0] && <CreateReply id={post[0]._id} />}

      <div className='pb-[32rem]'>
        {replies && replies.map((rep) => <Post post={rep} key={rep._id} />)}
        {/* {!repliesLoading && !repliesErr && replies.length === 0 && (
          <div className='text-center text-[#d9d9d9] py-3 text-lg'>
            No comments
          </div>
        )} */}
      </div>
    </div>
  );
};

export default StatusScreen;
