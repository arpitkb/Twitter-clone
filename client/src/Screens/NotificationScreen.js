import { CogIcon, SparklesIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const NotificationScreen = () => {
  const navigate = useNavigate();
  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 md:min-w-[580px] max-w-[620px]'>
      <div className='backdrop-blur-[12px] bg-black bg-opacity-60 flex justify-between items-center px-4 py-2 text-[#d9d9d9] sticky top-0 z-50'>
        <div className='font-bold text-xl'>Notifications</div>
        <div className='hoverAnim h-9 w-9 flex justify-center items-center xl:px-0'>
          <CogIcon className='h-6' />
        </div>
      </div>

      {2 == 2 && (
        <div className='flex flex-col justify-center items-start w-[22rem] mx-auto mt-9'>
          <div className='text-sm text-[#6e767d] my-5'>
            No notifications yet
          </div>
        </div>
      )}
      {/* <div className='pb-72'>
        <div className='text-center'>
          <Loader />
        </div>
      </div> */}
    </div>
  );
};

export default NotificationScreen;
