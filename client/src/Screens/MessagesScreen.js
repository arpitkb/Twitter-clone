import {
  CogIcon,
  InformationCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewMessageModal from "../components/modals/NewMessageModal";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../redux/actions/chat";
import Loader from "../components/Loader";

const MessagesScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isNewMessageModalOpen, setNewMessageModalOpen] = useState(false);
  const { loading, chats, err } = useSelector((state) => state.chats);
  const [selectedChat, setSelectedChat] = useState(
    location.pathname.split("/")[2] || null
  );

  useEffect(() => {
    setSelectedChat(location.pathname.split("/")[2] || null);
  }, [location.pathname]);

  useEffect(() => [dispatch(getChatList())], []);

  return (
    <>
      <div className='text-white hidden md:block flex-grow border-l border-gray-700 md:min-w-[300px] max-w-[390px]'>
        <div className='backdrop-blur-[12px] bg-black bg-opacity-60 px-4 py-2 text-[#d9d9d9] sticky top-0 z-50 border-b border-gray-700'>
          <div className='flex justify-between items-center'>
            <div className='font-bold'>Messages</div>
            <div
              onClick={() => {
                setNewMessageModalOpen(true);
              }}
              className='hoverAnim h-9 w-9 flex justify-center items-center xl:px-0'
            >
              <PlusCircleIcon className='h-6' />
            </div>
          </div>
          {chats.length > 0 && (
            <div>
              <input
                className='w-full mt-5 mb-2 bg-transparent border border-gray-800 outline-none text-[#d9d9d9] focus:border-[#1d9bf0] rounded-full py-2.5 px-5 placeholder:text-center placeholder:text-sm placeholder:text-gray-500'
                type='text'
                placeholder={`Search Direct Messages`}
              />
            </div>
          )}
        </div>

        <div>
          {!loading && chats.length === 0 && (
            <div className='flex flex-col justify-center w-[22rem] mx-auto mt-5'>
              <div className='text-3xl font-extrabold text-[#d9d9d9]'>
                Send a message, get a message
              </div>
              <div className='text-sm text-[#6e767d] my-5'>
                Direct Messages are private conversations between you and other
                people on Twitter. Share Tweets, media, and more!
              </div>
              <button
                onClick={() => {
                  setNewMessageModalOpen(true);
                }}
                className='bg-[#1d9bf0] hover:bg-[#1a8cd8] text-lg px-7 py-2.5 mt-2 rounded-full font-bold'
              >
                Start a conversation
              </button>
            </div>
          )}
          {chats &&
            chats.map((el, index) => (
              <div
                onClick={() => {
                  setSelectedChat(el._id);
                  navigate(`/messages/${el._id}`);
                }}
                key={index}
                className={`flex items-center py-5 px-7 hover:bg-[#1717298e] ${
                  selectedChat == el._id && "border-r-2 border-[#1d9bf0]"
                } hover:cursor-pointer`}
              >
                <div className='border-gray-700'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
                  />
                </div>
                <div className='ml-4'>
                  <div className='font-bold flex items-start'>
                    {el.chatName.slice(0, 29)}
                    <span>{el.chatName.length > 29 && "..."}</span>
                    {/* <span className='text-[#71767B] text-sm ml-1'>
                      {!el.isGroupChat && }
                    </span> */}
                  </div>
                  <div className='text-[#71767B] text-sm'>Last message</div>
                </div>
              </div>
            ))}

          {loading && (
            <div className='text-center mt-40'>
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className='text-white flex-grow border-r border-l border-gray-700 md:min-w-[400px] max-w-[630px]'>
        {location.pathname.split("/")[2] ? (
          <div className='backdrop-blur-[12px] bg-black bg-opacity-60 flex items-center px-4 py-2 text-[#d9d9d9] sticky top-0 z-50'>
            <img
              className='w-6 h-6 rounded-full'
              src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
            />
            <div className='font-bold text-xl ml-3'>Home</div>
            <InformationCircleIcon className='h-6 text-[#d9d9d9] ml-auto' />
          </div>
        ) : (
          <div className='flex flex-col justify-center items-start w-[22rem] mx-auto mt-40'>
            <div className='text-3xl font-extrabold text-[#d9d9d9]'>
              You don't have a message selected
            </div>
            <div className='text-sm text-[#6e767d] my-5'>
              Choose one from your existing messages, or start a new one.
            </div>
            <button
              onClick={() => {
                setNewMessageModalOpen(true);
              }}
              className='bg-[#1d9bf0] hover:bg-[#1a8cd8] text-lg px-7 py-2.5 mt-2 rounded-full font-bold'
            >
              New Message
            </button>
          </div>
        )}
      </div>
      <NewMessageModal
        isOpen={isNewMessageModalOpen}
        closeModal={() => {
          setNewMessageModalOpen(false);
        }}
      />
    </>
  );
};

export default MessagesScreen;
