import React, { useEffect } from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import CreateTweet from "./CreateTweet";
import Post from "./Post";
import Loader from "./Loader";

const Feed = ({ posts, loading }) => {
  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 max-w-[600px] sm:ml-[85px] xl:ml-[403px]'>
      <div className='backdrop-blur-[12px] bg-black bg-opacity-60 flex justify-between items-center px-4 py-2 text-[#d9d9d9] sticky top-0 z-50'>
        <div className='font-bold text-xl'>Home</div>
        <div className='hoverAnim h-9 w-9 flex justify-center items-center xl:px-0'>
          <SparklesIcon className='h-6' />
        </div>
      </div>
      <CreateTweet />
      {loading && (
        <div className='text-center'>
          <Loader />
        </div>
      )}
      <div className='pb-72'>
        {posts &&
          posts.map((el) => <Post key={el._id} postPage={false} post={el} />)}
      </div>
    </div>
  );
};

export default Feed;
