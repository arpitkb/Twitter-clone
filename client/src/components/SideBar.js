import React, { useState, useEffect, useRef } from "react";
import SideBarLink from "./SideBarLink";
import { HomeIcon, CheckIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
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
import LogoutModal from "./modals/LogoutModal";
import { useSelector } from "react-redux";

const SideBar = () => {
  const [showPopupAccount, setShowPopupAccount] = useState(false);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const { user, loading } = useSelector((state) => state.auth);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (showPopupAccount && ref.current && !ref.current.contains(e.target)) {
        setShowPopupAccount(false);
      }
    };

    document.addEventListener("click", checkIfClickedOutside, true);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside, true);
    };
  }, [showPopupAccount]);

  return (
    <div className='relative text-[#d9d9d9] hidden sm:flex items-center flex-col xl:items-start xl:w-[350px] px-2'>
      <div className='sticky top-0 z-50 bg-black h-screen'>
        <Link
          to='/home'
          className='flex items-center justify-center w-14 hoverAnim p-0 xl:ml-16'
        >
          <img src='https://rb.gy/ogau5a' className='h-7' />
        </Link>
        <div className='space-y-2 xl:ml-16 mb-2.5'>
          <SideBarLink link='/home' text='Home' Icon={HomeIcon} />
          <SideBarLink link='/explore' text='Explore' Icon={HashtagIcon} />
          <SideBarLink
            link='/notification'
            text='Notifications'
            Icon={BellIcon}
          />
          <SideBarLink link='/messages' text='Messages' Icon={InboxIcon} />
          <SideBarLink link='/profile' text='Bookmarks' Icon={BookmarkIcon} />
          <SideBarLink
            link='/bookmarks'
            text='Lists'
            Icon={ClipboardListIcon}
          />
          <SideBarLink
            link={`/${user && user.username}`}
            text='Profile'
            Icon={UserIcon}
          />
          <SideBarLink link='/k' text='More' Icon={DotsCircleHorizontalIcon} />
        </div>
        <button
          onClick={() => {
            navigate("/home/compose");
          }}
          className='hidden xl:inline ml-16 text-white bg-[#1d9bf0] rounded-full w-56 h-[50px] font-bold text-lg hover:bg-[#1a8cd8]'
        >
          Tweet
        </button>
        <div
          onClick={(e) => {
            e.stopPropagation();
            setShowPopupAccount(true);
          }}
          className='flex items-center justify-around mt-14 xl:ml-16 xl:-mr-auto mb-2 hoverAnim'
        >
          <img
            className='w-11 h-11 rounded-full xl:mr-2.5'
            src={user && user.profilePic}
          />
          <div className='leading-5 hidden xl:inline pr-3'>
            <h5 className='font-bold'>{user && user.name}</h5>
            <p className='text-[#6e767d]'>@{user && user.username}</p>
          </div>
          <DotsHorizontalIcon className='h-5 hidden xl:inline ml-3' />
        </div>
        <div className='relative'>
          {showPopupAccount && (
            <div
              ref={ref}
              className='drop-shadow-[0px_0px_7px_rgba(255,255,255,0.25)] h-44 w-72 sm:-left-12 xl:left-12 bg-black border-gray-700 absolute py-4 d-flex -top-64 border rounded-2xl animate-[appear_0.08s_ease-in]'
            >
              <div className='flex items-center justify-around mb-2 px-3'>
                <img
                  className='w-14 h-14 rounded-full xl:mr-2.5'
                  src={user && user.profilePic}
                />
                <div className='leading-5 ml-2 xl:ml-0 mr-auto'>
                  <h5 className='font-bold'>{user && user.name}</h5>
                  <p className='text-[#6e767d]'>@{user && user.username}</p>
                </div>
                <CheckIcon className='h-6 fill-[#1d9bf0]' />
              </div>
              <hr className='bg-gray-700 border-gray-700' />
              <div
                onClick={() => {
                  setModalOpen(true);
                }}
                className='flex mb-2 px-3 py-3 mt-2 hover:cursor-pointer hover:bg-gray-500 hover:bg-opacity-30'
              >
                <div className='text-[#d9d9d9]'>
                  Log out @{user && user.username}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <LogoutModal
        isOpen={modalOpen}
        closeModal={() => {
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default SideBar;
