import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  LightningBoltIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import React, { useState } from "react";
import Modal from "./Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { likePost, toggleRetweet } from "../redux/actions/post";
import { dateDisplayPost, timeDateDisplay } from "../utils/datesAndTime";

const Post = ({ postPage, post,str }) => {
  let comments = 3;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const isRetweeted = !post.content;
  let rb = post.author.username;
  let selfId = post._id;
  if (isRetweeted) post = post.retweetPost;
  let isLikedByMe = user.likes.includes(post._id);
  let isRetweetedByMe = user.retweets.includes(post._id);

  return (
    <>
      <div className='px-3 ml-11 text-sm font-bold pt-3 text-[#6e767d]'>
        {isRetweeted
          ? `${rb === user.username ? "You" : `@${rb}`} Retweeted`
          : ""}
      </div>
      {/* {isRetweeted && <div className='px-3 pt-3'>@{rb} retweeted</div>} */}
      <div
        className={`px-3 pb-3 flex cursor-pointer ${!str && 'border-b'} border-gray-700`}
        onClick={() => {
          if (!postPage)
            navigate(`/${post.author.username}/status/${post._id}`);
        }}
      >
        {!postPage && (
          <img
            className='w-11 h-11 rounded-full mr-3'
            src={post.author.profilePic}
          />
        )}
        <div className='flex flex-col space-y-2 w-full'>
          <div className={`flex ${!postPage && "justify-between"}`}>
            {postPage && (
              <img
                src={post.author.profilePic}
                alt='Profile Pic'
                className='h-11 w-11 rounded-full mr-3'
              />
            )}
            <div className='text-[#6e767d]'>
              <div className='inline-block group'>
                <h4
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/${post.author.username}`);
                  }}
                  className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                    !postPage && "inline-block"
                  }`}
                >
                  {post.author.name}
                </h4>
                <span
                  className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
                >
                  @{post.author.username}
                </span>
              </div>{" "}
              &#8231;{" "}
              {!postPage && (
                <span className='hover:underline text-sm sm:text-[15px]'>
                  {/* <Moment fromNow>{post?.timestamp?.toDate()}</Moment> */}
                  {/* {<Moment fromNow>{post.createdAt}</Moment>} */}
                  {dateDisplayPost(post.createdAt)}
                </span>
              )}
              {!postPage && post.replyTo && <div className='text-[#6e767d]'>Replying to <span onClick={(e)=>{
                e.stopPropagation()
                navigate(`/${post.replyTo.author.username}`)
              }} className='text-[#1d9bf0] hover:underline'>@{post.replyTo.author.username}</span></div>}

              {!postPage && (
                <p className='text-[#d9d9d9] text-[15px] sm:text-base mt-0.5'>
                  {post.content}
                </p>
              )}
            </div>
            <div className='icon group flex-shrink-0 ml-auto'>
              <DotsHorizontalIcon className='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]' />
            </div>
          </div>
          {postPage && post.replyTo && <div className='text-[#6e767d]'>Replying to <span onClick={(e)=>{
                e.stopPropagation()
                navigate(`/${post.replyTo.author.username}`)
              }} className='text-[#1d9bf0] hover:underline'>@{post.replyTo.author.username}</span></div>}
          {postPage && (
            <p className='text-[#d9d9d9] mt-0.5 text-xl'>{post.content}</p>
          )}
          {post.images.length == 4 && (
            <div className='grid  grid-cols-2 gap-[3px] max-h-[300px] mb-2 rounded-2xl border border-gray-700 overflow-hidden'>
              {post.images.map((el, index) => (
                <img
                  key={index}
                  src={el}
                  alt=''
                  className='h-[150px] object-center w-full object-cover mr-2'
                />
              ))}
            </div>
          )}
          {post.images.length == 2 && (
            <div className='grid  grid-cols-2 gap-[3px] max-h-[300px] mb-2 rounded-2xl border border-gray-700 overflow-hidden'>
              {post.images.map((el, index) => (
                <img
                  key={index}
                  src={el}
                  alt=''
                  className='h-[300px] object-center w-full object-cover mr-2'
                />
              ))}
            </div>
          )}
          {post.images.length == 1 && (
            <div className='border max-h-[300px] overflow-hidden border-gray-700 rounded-2xl mb-2'>
              <img
                src={post.images[0]}
                alt=''
                className='h-[300px] w-full object-cover object-center mr-2'
              />
            </div>
          )}
          {post.images.length == 3 && (
            <div className='grid grid-cols-2 max-h-[300px] gap-[3px] grid-flow-col mb-2 rounded-2xl border border-gray-700 overflow-hidden'>
              {post.images.map((el, index) => (
                <div className={`${index === 0 ? "row-span-2" : ""}`}>
                  <img
                    key={index}
                    src={el}
                    alt=''
                    className={`${
                      index === 0 ? "h-[320px]" : "h-[160px]"
                    } w-full object-center object-cover mr-2`}
                  />
                </div>
              ))}
            </div>
          )}

          {postPage && (
            <div className='ml-1 hover:underline-offset-1 hover:underline border-b border-gray-700 pb-4 pt-2 text-[#6e767d] text-sm sm:text-[15px] tracking-wide'>
              <span>{timeDateDisplay(post.createdAt)[0]}</span> &#8231;{" "}
              <span>{timeDateDisplay(post.createdAt)[1]}</span>
            </div>
          )}

          <div
            className={`text-[#6e767d] flex justify-between w-10/12 ${
              postPage && "mx-auto"
            }`}
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
              className='flex items-center space-x-1 group'
            >
              <div className='icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10'>
                <ChatIcon className='h-5 group-hover:text-[#1d9bf0]' />
              </div>
              {!comments.length > 0 && (
                <span className='group-hover:text-[#1d9bf0] text-sm'>2</span>
              )}
            </div>

            {post.author._id === user._id ? (
              <div className='flex items-center space-x-1 group'>
                <div className='icon group-hover:bg-red-600/10'>
                  <TrashIcon className='h-5 group-hover:text-red-600' />
                </div>
              </div>
            ) : (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    toggleRetweet(
                      post._id,
                      user._id,
                      isRetweeted ? selfId : null,
                      isRetweetedByMe,
                      str ? !postPage : postPage
                    )
                  );
                  console.log("retweet");
                }}
                className='flex items-center space-x-1 group'
              >
                <div
                  className={`icon group-hover:bg-[#19CF86] group-hover:bg-opacity-10`}
                >
                  <svg
                    className={`h-6 w-6 ${
                      isRetweetedByMe ? "fill-[#19CF86]" : " fill-[#6e767d]"
                    } group-hover:fill-[#19CF86]`}
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 75 72'
                  >
                    <path
                      stroke='black'
                      strokeWidth='2'
                      d='M70.676 36.644C70.166 35.636 69.13 35 68 35h-7V19c0-2.21-1.79-4-4-4H34c-2.21 0-4 1.79-4 4s1.79 4 4 4h18c.552 0 .998.446 1 .998V35h-7c-1.13 0-2.165.636-2.676 1.644-.51 1.01-.412 2.22.257 3.13l11 15C55.148 55.545 56.046 56 57 56s1.855-.455 2.42-1.226l11-15c.668-.912.767-2.122.256-3.13zM40 48H22c-.54 0-.97-.427-.992-.96L21 36h7c1.13 0 2.166-.636 2.677-1.644.51-1.01.412-2.22-.257-3.13l-11-15C18.854 15.455 17.956 15 17 15s-1.854.455-2.42 1.226l-11 15c-.667.912-.767 2.122-.255 3.13C3.835 35.365 4.87 36 6 36h7l.012 16.003c.002 2.208 1.792 3.997 4 3.997h22.99c2.208 0 4-1.79 4-4s-1.792-4-4-4z'
                    />
                  </svg>
                </div>
                <span
                  className={`group-hover:text-[#19CF86] ${
                    isRetweetedByMe ? "text-[#19CF86]" : ""
                  } text-sm`}
                >
                  {post.retweetUsers.length > 0 && post.retweetUsers.length}
                </span>
              </div>
            )}

            <div
              onClick={(e) => {
                e.stopPropagation();
                dispatch(likePost(post._id, user._id, isLikedByMe, str?!postPage : postPage));
              }}
              className='flex items-center space-x-1 group'
            >
              <div className='icon active:animate-ping-slow group-hover:bg-pink-600/10'>
                {isLikedByMe ? (
                  <HeartIconFilled className='h-5 text-pink-600' />
                ) : (
                  <HeartIcon className='h-5 group-hover:text-pink-600' />
                )}
              </div>
              {post.likes.length > 0 && (
                <span
                  className={`group-hover:text-pink-600 text-sm ${
                    isLikedByMe && "text-pink-600"
                  }`}
                >
                  {post.likes.length}
                </span>
              )}
            </div>

            <div className='icon group'>
              <ShareIcon className='h-5 group-hover:text-[#1d9bf0]' />
            </div>
            {!postPage && (
              <div className='flex items-center group'>
                <div className='icon group-hover:bg-[#e3cf8f] group-hover:bg-opacity-10'>
                  <ChartBarIcon className='h-5 group-hover:text-[#e3cf8f]' />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal
        post={post}
        isOpen={openModal}
        closeModal={() => {
          setOpenModal(false);
        }}
      />
      {/* {isReply && <Modal />} */}
    </>
  );
};

export default Post;
