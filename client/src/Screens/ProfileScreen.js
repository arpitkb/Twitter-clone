import React from "react";

import {
  ArrowLeftIcon,
  CalendarIcon,
  LinkIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import Post from "../components/Post";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <div className='text-white flex-grow border-l border-r border-gray-700 max-w-[600px] sm:ml-[85px] xl:ml-[403px]'>
        <div className='backdrop-blur-[12px] bg-black bg-opacity-60 flex justify-start items-center px-3 py-1 text-[#d9d9d9] sticky top-0 z-50'>
          <div
            onClick={() => {
              navigate("/home");
            }}
            className='hoverAnim h-9 w-9 flex justify-center ms-0 items-center xl:px-0'
          >
            <ArrowLeftIcon className='h-5' />
          </div>
          <div className='flex flex-col justify-start mx-6'>
            <div className='font-bold text-[#d9d9d9] text-xl'>Light</div>
            <div className='tex text-sm mt-[-2px] text-gray-500'>10 Tweets</div>
          </div>
        </div>

        <div className='h-[210px] overflow-hidden'>
          <img
            className='w-full object-cover'
            alt=''
            src='https://pbs.twimg.com/profile_banners/1150840261129302017/1588709742/1500x500'
          />
        </div>
        <div className='relative flex justify-end'>
          <div className='absolute -top-16 h-[140px] w-[140px] rounded-full overflow-hidden border-4 border-black left-4'>
            <img
              className='object-cover h-full w-full'
              src='https://pbs.twimg.com/profile_images/1271170759897931776/ytxUlccB_400x400.jpg'
              alt=''
            />
          </div>
          <div className='m-3 h-12'>
            <button className='px-4 py-1 border hover:bg-gray-200 transition-all duration-300 hover:bg-opacity-10 border-gray-700 rounded-3xl font-bold'>
              Edit Profile
            </button>
          </div>
        </div>
        <div className='flex mt-4 px-4 flex-col'>
          <div className='flex flex-col'>
            <div className='font-bold text-[#d9d9d9] text-xl'>Arpi bansal</div>
            <div className='text-[#6e767d]'>@Arpit_kb16</div>
          </div>
          <div className='text-[#d9d9d9] pt-2 pb-1'>
            Student<div className='text-[#d9d9d9]'>NIT Warangal</div>
          </div>

          <div className='flex items-center flex-row space-x-3 text-[#6e767d]'>
            <div>
              <LocationMarkerIcon className='h-5 inline mr-1' />
              <span>it's my location</span>
            </div>
            <div>
              <LinkIcon className='h-5 inline mr-1' />
              <span>methpros.me</span>
            </div>
            <div>
              <CalendarIcon className='h-5 inline mr-1 font-thin' />
              <span>Joined November 2021</span>
            </div>
          </div>
          <div className='flex space-x-5 py-2 text-[#d9d9d9]'>
            <div>
              66 <span className='text-[#6e767d]'>Following</span>
            </div>
            <div>
              12 <span className='text-[#6e767d]'>Followers</span>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-5 mt-2 border-b border-gray-700'>
          <div
            onClick={() => {
              navigate("/Arpit_ba19856");
            }}
            className={`text-center ${
              !location.pathname.split("/")[2]
                ? "underline text-[#d9d9d9] font-bold underline-offset-[15px] decoration-4 decoration-[#1D9bf0]"
                : "text-[#6e767d]"
            } hover:bg-gray-300 duration-200 hover:bg-opacity-10 py-4 cursor-pointer`}
          >
            Tweet
          </div>
          <div
            onClick={() => {
              navigate(`/Arpit_ba19856/with_replies`);
            }}
            className={`text-center col-span-2 ${
              location.pathname.split("/")[2] === "with_replies"
                ? "underline text-[#d9d9d9] font-bold underline-offset-[15px] decoration-4 decoration-[#1D9bf0]"
                : "text-[#6e767d]"
            } hover:bg-gray-300 duration-200 hover:bg-opacity-10 py-4 cursor-pointer`}
          >
            Tweet &amp; Replies
          </div>
          <div
            onClick={() => {
              navigate(`/Arpit_ba19856/media`);
            }}
            className={`text-center ${
              location.pathname.split("/")[2] === "media"
                ? "underline text-[#d9d9d9] font-bold underline-offset-[15px] decoration-4 decoration-[#1D9bf0]"
                : "text-[#6e767d]"
            } hover:bg-gray-300 duration-200 hover:bg-opacity-10 py-4 cursor-pointer`}
          >
            Media
          </div>
          <div
            onClick={() => {
              navigate(`/Arpit_ba19856/likes`);
            }}
            className={`text-center ${
              location.pathname.split("/")[2] === "likes"
                ? "underline text-[#d9d9d9] font-bold underline-offset-[15px] decoration-4 decoration-[#1D9bf0]"
                : "text-[#6e767d]"
            } hover:bg-gray-300 duration-200 hover:bg-opacity-10 py-4 cursor-pointer`}
          >
            Likes
          </div>
        </div>
        <div className='pb-72'>
          {!location.pathname.split("/")[2] && (
            <>
              <Post />
              <Post />
            </>
          )}
          {location.pathname.split("/")[2] === "with_replies" && (
            <>
              <Post />
              <Post />
            </>
          )}
          {location.pathname.split("/")[2] === "media" && <div>Media</div>}
          {location.pathname.split("/")[2] === "likes" && <div>Likes</div>}
        </div>
      </div>{" "}
    </>
  );
};

export default ProfileScreen;
