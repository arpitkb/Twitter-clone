import {
  ChevronDoubleRightIcon,
  CogIcon,
  InformationCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NewMessageModal from "../components/modals/NewMessageModal";
import TypingLoader from "../components/TypingLoader";
import { useDispatch, useSelector } from "react-redux";
import {
  getChat,
  getChatList,
  addMessage,
  getMessages,
} from "../redux/actions/chat";
import Loader from "../components/Loader";
import TextareaAutosize from "react-textarea-autosize";
import { getChatName, getChatUsername } from "../utils/functions";
import { messageTimeDisplay } from "../utils/datesAndTime";
import io from "socket.io-client";
import api from "../utils/api";

const MessagesScreen = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isNewMessageModalOpen, setNewMessageModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [socket, setSocket] = useState();
  const [connected, setConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  // const [lastTypingTime, setLastTypingTime] = useState();
  let lastTypingTime = 0;
  const [newMessage, setNewMessage] = useState(null);

  // Accessing redux states
  const {
    loading: chatsLoading,
    chats,
    err: chatsErr,
  } = useSelector((state) => state.chats);
  const {
    messages,
    loading: messagesLoading,
    err: messagesErr,
  } = useSelector((state) => state.messages);
  const {
    loading: chatLoading,
    chat,
    err: chatErr,
  } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);

  const ref = useRef();

  const lastRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  });

  // socket.io use effects

  useEffect(() => {
    const newsocket = io("ws://localhost:9999");
    setSocket(newsocket);

    return () => newsocket.close();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.emit("setUp", user);

    const connectedCallback = () => {
      console.log("You joined the room");
      setConnected(true);
    };
    const typingCallback = () => {
      setTyping(true);
      // setLastTypingTime(new Date().getTime());
      // lastTypingTime = Date.now();
    };

    const stopTypingCallback = () => {
      setTyping(false);
      console.log("stopped");
    };

    socket.on("connected", connectedCallback);
    socket.on("typing", typingCallback);
    socket.on("stop-typing", stopTypingCallback);

    return () => {
      socket.off("connected", connectedCallback);
      socket.off("typing", typingCallback);
      socket.off("stop-typing", stopTypingCallback);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const callback = (msg) => {
      // if (chat) console.log(chat._id, msg);
      if (chat && chat._id == msg.chat._id) {
        dispatch(addMessage(msg));
      } else {
        alert(`new message from ${msg.sender.name}`);
      }
    };

    socket.on("recieve-new-message", callback);

    return () => {
      socket.off("recieve-new-message", callback);
    };
  }, [socket, chat]);

  // Normal useEffects
  useEffect(() => [dispatch(getChatList())], []);

  useEffect(() => {
    if (location.pathname.split("/")[2]) {
      dispatch(getChat(location.pathname.split("/")[2]));
      dispatch(getMessages(location.pathname.split("/")[2]));
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!chatLoading && chatErr) {
      // navigate("/messages");
      console.log("hehe");
    } else if (chat && socket) {
      socket.emit("join-chat-room", chat._id);
    }
  }, [chatLoading, socket]);

  const sendMessage = async () => {
    if (!connected || !chat) return;
    let msg = ref.current && ref.current.value.trim();
    if (!msg) return;
    const { data } = await api.post(`/api/message`, {
      content: msg,
      chatId: chat._id,
    });

    socket.emit("send-new-message", { message: data, room: chat._id });
    if (data) dispatch(addMessage(data));
  };

  const updateTyping = () => {
    if (!socket) return;
    if (!typing) {
      socket.emit("typing", chat._id);
      lastTypingTime = Date.now();
    }

    setTimeout(() => {
      if (Date.now() - lastTypingTime >= 2000) {
        socket.emit("stop-typing", chat._id);
      }
    }, 2000);
  };

  return (
    <>
      <div className='text-white border-l flex-grow md:flex-grow-0 border-r border-gray-700 min-w-[390px]'>
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
          {!chatsLoading && chats.length === 0 && (
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
                  // setSelectedChat(el._id);
                  navigate(`/messages/${el._id}`);
                }}
                key={index}
                className={`flex items-center py-5 px-7 hover:bg-[#1717298e] ${
                  location.pathname.split("/")[2] == el._id &&
                  "border-r-2 border-[#1d9bf0]"
                } hover:cursor-pointer`}
              >
                <div className='mr-4'>
                  <img
                    className='w-10 h-10 rounded-full'
                    src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
                  />
                </div>
                <div className=''>
                  <div className='font-bold'>
                    {/* <div className='truncate ...'>{el.chatName}</div> */}
                    {getChatName(el.users, user._id) &&
                      getChatName(el.users, user._id).slice(0, 18)}
                    {/* {el.chatName.slice(0, 18)} */}
                    <span>{getChatName(el.users, user._id) > 18 && "..."}</span>
                    {!el.isGroupChat && (
                      <span className='text-[#71767B] text-sm ml-1'>
                        {getChatUsername(el.users, user._id)}
                      </span>
                    )}
                  </div>
                  <div
                    className={` ${
                      2 == 2 ? "text-[#71767B] text-sm" : "font-bold"
                    }`}
                  >
                    {el.latestMessage
                      ? el.latestMessage.content
                      : "No messages"}
                  </div>
                  {/* {newMessage && newMessage.chat._id===el._id && <div
                    className={` ${
                      2 != 2 ? "text-[#71767B] text-sm" : "font-bold"
                    }`}
                  >
                    {newMessage}
                  </div>} */}
                </div>
              </div>
            ))}

          {chatsLoading && (
            <div className='text-center mt-40'>
              <Loader />
            </div>
          )}
        </div>
      </div>
      <div className='text-white h-screen flex flex-col flex-grow border-r border-l border-gray-700 md:max-w-[630px] md:mr-20'>
        {location.pathname.split("/")[2] ? (
          <>
            <div className='backdrop-blur-[12px] bg-black bg-opacity-60 flex items-center px-4 py-2 text-[#d9d9d9] sticky top-0 z-50'>
              <img
                className='w-6 h-6 rounded-full'
                src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
              />
              <div className='font-bold text-xl ml-3'>
                {chat && getChatName(chat.users, user._id)}
              </div>
              <InformationCircleIcon className='h-6 text-[#d9d9d9] ml-auto' />
            </div>
            {messages && messages.length > 0 && (
              <div className='py-5 px-4 flex flex-col overflow-y-auto h-full'>
                {messages.map((el, index) => (
                  <>
                    <div
                      key={el._id}
                      ref={messages.length === index + 1 ? lastRef : null}
                      className={`bg-[#1d9bf0] rounded-t-2xl mt-1.5 py-1 px-4 max-w-sm break-words ${
                        el.sender._id == user._id
                          ? "rounded-l-2xl self-end"
                          : " rounded-r-2xl self-start"
                      }`}
                    >
                      {el.content}
                    </div>
                    <div
                      key={index}
                      className={`mb-1.5 text-xs text-[#71767B] ms-1 ${
                        el.sender._id === user._id && "self-end"
                      }`}
                    >
                      {messageTimeDisplay(el.createdAt)}{" "}
                      {el.sender._id != user._id &&
                        el.sender.name.split(" ")[0].toLowerCase()}
                    </div>
                  </>
                ))}
                {typing && (
                  <div className='my-2 mr-auto'>
                    <TypingLoader />
                  </div>
                )}
              </div>
            )}
            {messagesLoading && (
              <div className='pb-5 px-4 flex flex-col overflow-y-auto h-full'>
                <Loader />
              </div>
            )}
            {messagesErr && (
              <div className='b border-t mt-auto px-3 py-1 text-red-500 border-gray-700'>
                {messagesErr}
              </div>
            )}
            <div className=' mt-auto flex flex-col'>
              {/* <div className='ml-5 mb-10 mr-auto'>
                <TypingLoader />
              </div> */}
              <div className='border-y flex items-center border-gray-700 py-1.5 px-3'>
                <TextareaAutosize
                  style={{ resize: "none" }}
                  minRows={1}
                  disabled={!connected || !socket || messagesLoading}
                  placeholder='Start a new message'
                  maxRows={10}
                  ref={ref}
                  onBlur={() => {
                    socket.emit("stop-typing", chat._id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key == "Enter") {
                      e.preventDefault();
                      socket.emit("stop-typing", chat._id);
                      sendMessage();
                      ref.current.value = "";
                    }
                  }}
                  onChange={updateTyping}
                  className='bg-transparent px-4 outline-none text-[#d9d9d9] text-sm placeholder-gray-500 w-full border border-gray-700 focus:border-[#1d9bf0] rounded-3xl py-2'
                />
                <button
                  onClick={() => {
                    socket.emit("stop-typing", chat._id);
                    sendMessage();
                    ref.current.value = "";
                  }}
                  disabled={ref.current && !ref.current.value.trim()}
                  className='hoverAnim disabled:cursor-not-allowed cursor-pointer h-9 w-9 flex justify-center mx-1 items-center xl:px-0'
                >
                  <ChevronDoubleRightIcon className='h-5 text-[#1d9bf0]' />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className='flex flex-col justify-center items-start w-[22rem] mx-auto mt-40 px-2'>
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
