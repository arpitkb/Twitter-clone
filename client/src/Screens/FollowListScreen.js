import React, { useEffect, useState, useRef } from "react";
import {
  ArrowLeftIcon,
  CalendarIcon,
  LinkIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { getUserProfile, getUsers, toggleFollow } from "../redux/actions/user";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import UnfollowModal from "../components/modals/UnfollowModal";

const FollowListScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const itemsRef = useRef([]);
  const { profile, loading, err } = useSelector((state) => state.profile);
  const { user: myself } = useSelector((state) => state.auth);

  // const [btnText, setBtnText] = useState("Following");

  const [isOpen, setIsOpen] = useState([false, null, null]);
  const {
    users,
    loading: userListLoading,
    err: userListErr,
  } = useSelector((state) => state.userList);
  const { username } = useParams();

  useEffect(() => {
    dispatch(getUserProfile(username));
  }, [username]);

  useEffect(() => {
    if (location.pathname.split("/")[2] === "following") {
      dispatch(getUsers(username, "following"));
    } else {
      dispatch(getUsers(username, "followers"));
    }
  }, [location, username]);

  const textChangeHandler = (i, text) => {
    itemsRef.current[i].textContent = text;
  };

  const FollowingComp = (
    <div className='flex flex-col justify-center items-start w-[22rem] mx-auto mt-9'>
      <div className='text-3xl font-extrabold text-[#d9d9d9]'>
        You aren't following anyone yet
      </div>
      <div className='text-sm text-[#6e767d] my-5'>
        When you do, they’ll be listed here and you’ll see their Tweets in your
        timeline.
      </div>
      <button
        onClick={() => {
          navigate("/i/connect");
        }}
        className='bg-[#1d9bf0] hover:bg-[#1a8cd8] text-lg px-7 py-2.5 mt-2 rounded-full font-bold'
      >
        Find people to follow
      </button>
    </div>
  );
  const FollowerComp = (
    <div className='flex flex-col justify-center items-start w-[22rem] mx-auto mt-9'>
      <div className='text-3xl font-extrabold text-[#d9d9d9]'>
        You don't have any followers yet
      </div>
      <div className='text-sm text-[#6e767d] my-5'>
        When someone follows you, you’ll see them here.
      </div>
    </div>
  );

  return (
    <>
      <div className='text-white flex-grow border-l border-r border-gray-700 md:min-w-[580px] max-w-[620px]'>
        <div className='backdrop-blur-[12px] bg-black bg-opacity-60 py-1 text-[#d9d9d9] sticky top-0 z-50'>
          <div className=' flex justify-start items-center px-3'>
            <div
              onClick={() => {
                navigate(`/${username}`);
              }}
              className='hoverAnim h-9 w-9 flex justify-center ms-0 items-center xl:px-0 mb-auto'
            >
              <ArrowLeftIcon className='h-5' />
            </div>
            <div className='flex flex-col justify-start mx-6'>
              <div className={`font-bold text-[#d9d9d9] text-xl`}>
                {loading && (
                  <span className='animate-pulse flex bg-slate-700 rounded-2xl h-6 w-24'></span>
                )}
                {profile && !loading && profile.name}
                {!profile && !loading && "Profile"}
              </div>
              <div className={`text-xs mt-[-2px] text-gray-500 mb-1`}>
                {<>@{username}</>}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 mt-2 text-sm  border-b border-gray-700'>
            <div
              onClick={() => {
                navigate(`/${username}/followers`);
              }}
              className={`text-center ${
                location.pathname.split("/")[2] === "followers"
                  ? "underline text-[#d9d9d9] font-bold underline-offset-[15px] decoration-4 decoration-[#1D9bf0]"
                  : "text-[#6e767d]"
              } hover:bg-gray-300 duration-200 hover:bg-opacity-10 py-4 cursor-pointer`}
            >
              Followers
            </div>
            <div
              onClick={() => {
                navigate(`/${username}/following`);
              }}
              className={`text-center ${
                location.pathname.split("/")[2] === "following"
                  ? "underline text-[#d9d9d9] font-bold underline-offset-[15px] decoration-4 decoration-[#1D9bf0]"
                  : "text-[#6e767d]"
              } hover:bg-gray-300 duration-200 hover:bg-opacity-10 py-4 cursor-pointer`}
            >
              Following
            </div>
          </div>
        </div>
        <div className='pb-[50rem]'>
          {userListLoading && (
            <div className='text-center'>
              <Loader />
            </div>
          )}
          {!loading &&
            users &&
            users.length === 0 &&
            location.pathname.split("/")[2] === "following" &&
            FollowingComp}
          {!loading &&
            users &&
            users.length === 0 &&
            location.pathname.split("/")[2] === "followers" &&
            FollowerComp}
          {users &&
            users.map((user, index) => (
              <div
                className='px-4 py-2 cursor-pointer transition duration-200 ease-out flex my-1'
                key={user._id}
              >
                <img
                  src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
                  // objectFit='cover'
                  className='rounded-full object-cover w-12 h-12'
                />
                <div className='ml-4 leading-5 group'>
                  <h4
                    onClick={() => {
                      navigate(`/${user.username}`);
                    }}
                    className='font-bold hover:underline decoration-1'
                  >
                    {user.name}
                  </h4>
                  <h5 className='text-gray-500 text-[15px]'>
                    @{user.username}
                  </h5>
                  <div className='font-thin mt-1'>
                    Official Twitter Page of Greater Chennai Corporation. You
                    can also follow us in Telegram{" "}
                  </div>
                </div>
                <div className='ml-auto'>
                  {user && myself.following.includes(user._id) ? (
                    <button
                      ref={(el) => (itemsRef.current[index] = el)}
                      id={user._id}
                      onPointerOver={() => {
                        textChangeHandler(index, "Unfollow");
                      }}
                      onPointerLeave={() => {
                        textChangeHandler(index, "Following");
                      }}
                      onClick={() => {
                        setIsOpen([true, user._id, user.username]);
                      }}
                      className={`w-28 py-1 border hover:cursor-pointer hover:text-[#f4212e] hover:border-[#67070f] hover:bg-[#f4212f18] transition-all duration-200 border-gray-700 rounded-full font-bold`}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        dispatch(toggleFollow(user._id));
                      }}
                      className='w-28 py-1 bg-white hover:cursor-pointer transition-all duration-200 hover:bg-gray-200 font-bold text-black rounded-full'
                    >
                      Follow <i className='fas fa-user-plus'></i>
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {isOpen[0] && isOpen[1] && (
        <UnfollowModal
          _id={isOpen[1]}
          username={isOpen[2]}
          isOpen={isOpen[0]}
          closeModal={() => {
            setIsOpen([false, null, null]);
          }}
        />
      )}
    </>
  );
};

export default FollowListScreen;
