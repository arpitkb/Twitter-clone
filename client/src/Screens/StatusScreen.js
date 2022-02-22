import React from "react";
import Post from "../components/Post";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const StatusScreen = () => {
  const navigate = useNavigate();

  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 max-w-[600px] sm:ml-[73px] xl:ml-[403px]'>
      <div className='backdrop-blur-[7px] flex justify-start items-center px-3 py-2 text-[#d9d9d9] sticky top-0 z-50'>
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
      {/* <CreateTweet /> */}
      <div className='pb-72'>
        {/* <Post onComment={showModal} postPage={false} /> */}
        <Post postPage={true} />
      </div>
    </div>
  );
};

export default StatusScreen;
