import React from "react";
import { SparklesIcon } from "@heroicons/react/outline";
import CreateTweet from "./CreateTweet";

const Feed = () => {
  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 max-w-[650px] xl:ml-12'>
      <div className='d flex justify-between items-center px-4 py-2 text-[#d9d9d9] sticky top-0 z-50 bg-black'>
        <div className='font-bold text-xl'>Home</div>
        <div className='hoverAnim h-9 w-9 flex justify-center items-center xl:px-0'>
          <SparklesIcon className='h-6' />
        </div>
      </div>
      <CreateTweet />
    </div>
  );
};

export default Feed;
