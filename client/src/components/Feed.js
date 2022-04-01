import React, { useEffect, useRef, useCallback } from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import CreateTweet from "./CreateTweet";
import Post from "./Post";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const Feed = ({ posts, loading, chngPage, hasMore }) => {
  const navigate = useNavigate();
  const observer = useRef();
  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // console.log("visible");
          chngPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 md:min-w-[580px] max-w-[620px]'>
      <div className='backdrop-blur-[12px] bg-black bg-opacity-60 flex justify-between items-center px-4 py-2 text-[#d9d9d9] sticky top-0 z-50'>
        <div className='font-bold text-xl'>Home</div>
        <div className='hoverAnim h-9 w-9 flex justify-center items-center xl:px-0'>
          <SparklesIcon className='h-6' />
        </div>
      </div>
      <CreateTweet />

      {!loading && posts && posts.length === 0 && (
        <div className='flex flex-col justify-center items-start w-[22rem] mx-auto mt-9'>
          <div className='text-3xl font-extrabold text-[#d9d9d9]'>
            Welcome to Twitter!
          </div>
          <div className='text-sm text-[#6e767d] my-5'>
            This could be the worst place to see what’s happening in your world.
            Find some people to follow now.
          </div>
          <button
            onClick={() => {
              navigate("/i/connect");
            }}
            className='bg-[#1d9bf0] hover:bg-[#1a8cd8] text-lg px-7 py-2.5 mt-2 rounded-full font-bold'
          >
            Lesgooo
          </button>
        </div>
      )}
      <div className='pb-72'>
        {posts &&
          posts.length > 0 &&
          posts.map((el, index) => {
            if (index + 1 === posts.length)
              return (
                <Post
                  innerRef={lastPostRef}
                  key={index}
                  postPage={false}
                  post={el}
                />
              );
            else return <Post key={el._id} postPage={false} post={el} />;
          })}

        {loading && (
          <div className='text-center'>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
