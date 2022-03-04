import React, { useEffect, useState } from "react";

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
} from "react-router-dom";
import Post from "../components/Post";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  getUserPosts,
  getUserLikedPosts,
  toggleFollow,
} from "../redux/actions/user";
import Loader from "../components/Loader";
import UnfollowModal from "../components/modals/UnfollowModal";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { profile, loading, err } = useSelector((state) => state.profile);
  const {
    loading: pLoading,
    err: pErr,
    posts,
  } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const { username } = useParams();
  const [btnText, setBtnText] = useState("Following");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(username));
  }, [username]);

  useEffect(() => {
    if (location.pathname.split("/")[2] === "likes")
      dispatch(getUserLikedPosts(username));
    else if (location.pathname.split("/")[2] === "with_replies")
      dispatch(getUserPosts(username));
    else if (location.pathname.split("/")[2] === "media")
      dispatch(getUserLikedPosts(username));
    else dispatch(getUserPosts(username));
  }, [username, location.pathname]);

  const followHandler = async () => {
    dispatch(toggleFollow(profile._id));
  };

  const unfollowHandler = async () => {
    setIsOpen(true);
  };

  return (
    <>
      <div className='text-white flex-grow border-l border-r border-gray-700 md:min-w-[580px] max-w-[620px]'>
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
            <div className='font-bold text-[#d9d9d9] text-xl'>
              {profile ? profile.username : "Profile"}
            </div>
            <div className='tex text-sm mt-[-2px] text-gray-500'>
              {profile ? (
                <>{posts ? `${posts.length} Tweet` : "Tweet"}</>
              ) : (
                "No tweets found"
              )}
            </div>
          </div>
        </div>

        <div className='h-[210px] overflow-hidden'>
          <img
            className='w-full object-cover'
            alt=''
            src={
              profile && profile.coverPic
                ? profile.coverPic
                : "https://wallpapercave.com/wp/wp4946969.jpg"
            }
          />
        </div>
        <div className='relative flex justify-end'>
          <div className='absolute -top-16 h-[140px] w-[140px] rounded-full overflow-hidden border-4 border-black left-4'>
            <img
              className={`object-cover h-full w-full`}
              src={
                profile
                  ? profile.profilePic
                  : "https://wallpapercave.com/wp/wp4946969.jpg"
              }
              alt=''
            />
          </div>
          <div className='m-3 h-12'>
            {profile && (
              <>
                {profile.username === user.username ? (
                  <button className='px-4 py-1 border hover:bg-gray-200 transition-all duration-300 hover:bg-opacity-10 border-gray-700 rounded-full font-bold'>
                    Edit Profile
                  </button>
                ) : (
                  <>
                    {user.following.includes(profile._id) ? (
                      <button
                        onPointerOver={() => {
                          setBtnText("Unfollow");
                        }}
                        onPointerLeave={() => {
                          setBtnText("Following");
                        }}
                        onClick={unfollowHandler}
                        className='wf w-28 py-1 border hover:cursor-pointer hover:text-[#f4212e] hover:border-[#67070f] hover:bg-[#f4212f18] transition-all duration-200 border-gray-700 rounded-full font-bold'
                      >
                        {btnText}
                      </button>
                    ) : (
                      <button
                        onClick={followHandler}
                        className='w-28 py-1 bg-white hover:cursor-pointer transition-all duration-200 hover:bg-gray-200 font-bold text-black rounded-full'
                      >
                        Follow <i className='fas fa-user-plus'></i>
                      </button>
                    )}
                    <UnfollowModal
                      _id={profile._id}
                      username={profile.username}
                      isOpen={isOpen}
                      closeModal={() => {
                        setIsOpen(false);
                      }}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {loading && (
          <div className='text-center'>
            <Loader />
          </div>
        )}
        {profile && (
          <div className='flex mt-4 px-4 flex-col'>
            <div className='flex flex-col'>
              <div className='font-bold text-[#d9d9d9] text-xl'>
                {profile.name}
              </div>
              <div className='text-[#6e767d]'>@{profile.username}</div>
            </div>
            <div className='text-[#d9d9d9] pt-2 pb-1'>
              {profile.bio && profile.bio}
            </div>

            <div className='flex items-center flex-row space-x-3 text-[#6e767d]'>
              {profile.location && (
                <div>
                  <LocationMarkerIcon className='h-5 inline mr-1' />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div>
                  <LinkIcon className='h-5 inline mr-1' />
                  <span>{profile.website}</span>
                </div>
              )}
              <div>
                <CalendarIcon className='h-5 inline mr-1 font-thin' />
                <span>
                  Joined{" "}
                  {new Date(profile.createdAt).toDateString().substring(4)}
                </span>
              </div>
            </div>
            <div className='flex space-x-5 py-2 text-[#d9d9d9]'>
              <div>
                {profile.following.length}{" "}
                <span className='text-[#6e767d]'>Following</span>
              </div>
              <div>
                {profile.followers.length}{" "}
                <span className='text-[#6e767d]'>Followers</span>
              </div>
            </div>
          </div>
        )}
        {err && (
          <div className='text-center mt-10'>
            <div className='font-bold text-[30px]'>{err}</div>
            <div className='text-[#6e767d]'>Try searching for others</div>
          </div>
        )}
        {profile && (
          <>
            <div className='grid grid-cols-5 mt-2 border-b border-gray-700'>
              <div
                onClick={() => {
                  navigate(`/${profile.username}`);
                }}
                className={`text-center ${
                  !location.pathname.split("/")[2]
                    ? "underline text-[#d9d9d9] font-bold underline-offset-[15px] decoration-4 decoration-[#1D9bf0]"
                    : "text-[#6e767d]"
                } hover:bg-gray-300 duration-200 hover:bg-opacity-10 py-4 cursor-pointer`}
              >
                Tweets
              </div>
              <div
                onClick={() => {
                  navigate(`/${profile.username}/with_replies`);
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
                  navigate(`/${profile.username}/media`);
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
                  navigate(`/${profile.username}/likes`);
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
              {pLoading && (
                <div className='text-center'>
                  <Loader />
                </div>
              )}
              {!pLoading && pErr && <div>{pErr}</div>}
              {!pLoading &&
                posts &&
                posts.map((el) => <Post key={el._id} post={el} />)}
              {!pLoading && posts && posts.length === 0 && (
                <div className='flex justify-center'>
                  <div className='text-[#d9d9d9] text-[32px] font-bold px-24 mt-10'>
                    {`${
                      username === user.username
                        ? "You don't have any matching Tweets yet"
                        : "No matching tweets yet"
                    }`}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProfileScreen;
