import React from "react";
import SideBarLink from "./SideBarLink";
import { HomeIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

const SideBar = () => {
  return (
    <div className='text-[#d9d9d9] bg-black hidden w-[85px] sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 h-full'>
      <Link
        to='/home'
        className='flex items-center justify-center w-14 hoverAnim p-0 xl:ml-24'
      >
        <img src='https://rb.gy/ogau5a' className='h-7' />
      </Link>
      <div className='space-y-2 xl:ml-24 mb-2.5'>
        <SideBarLink link='/home' text='Home' Icon={HomeIcon} active />
        <SideBarLink link='/profile' text='Explore' Icon={HashtagIcon} />
        <SideBarLink link='/profile' text='Notifications' Icon={BellIcon} />
        <SideBarLink link='/profile' text='Messages' Icon={InboxIcon} />
        <SideBarLink
          link='/profile'
          text='Bookmarks'
          Icon={BookmarkIcon}
          active
        />
        <SideBarLink link='/profile' text='Lists' Icon={ClipboardListIcon} />
        <SideBarLink link='/profile' text='Profile' Icon={UserIcon} />
        <SideBarLink
          link='/profile'
          text='More'
          Icon={DotsCircleHorizontalIcon}
        />
      </div>
      <button className='hidden xl:inline ml-auto text-white bg-[#1d9bf0] rounded-full w-56 h-[50px] font-bold text-lg hover:bg-[#1a8cd8]'>
        Tweet
      </button>
      <div className='flex items-center justify-around mt-14 xl:ml-auto xl:-mr-10 mb-2 hoverAnim'>
        <img
          className='w-11 h-11 rounded-full xl:mr-2.5'
          src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
        />
        <div className='leading-5 hidden xl:inline pr-3'>
          <h5 className='font-bold'>Light</h5>
          <p className='text-[#6e767d]'>@Arpitba12919671</p>
        </div>
        <DotsHorizontalIcon className='h-5 hidden xl:inline ml-3' />
      </div>
    </div>
  );
};

export default SideBar;
