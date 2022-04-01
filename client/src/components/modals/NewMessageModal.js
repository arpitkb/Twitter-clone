import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { getUsersByKeyword } from "../../redux/actions/user";
import { createChat } from "../../redux/actions/chat";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  SearchIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import SideLoader from "../SideLoader";
import { useLocation, useNavigate } from "react-router-dom";

const NewMessageModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedUsers, setSelectedusers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [groupMode, toggleGroupMode] = useState(false);

  const { loading, users, err } = useSelector((state) => state.users);

  useEffect(() => {
    if (!keyword.trim()) return;
    // setL(true);
    const request = setTimeout(() => {
      dispatch(getUsersByKeyword(keyword));
      //   setL(false);
    }, 200);

    return () => {
      clearTimeout(request);
    };
  }, [keyword]);

  const userss = [
    {
      name: "Chennai smart",
      username: "csmart45",
    },
    {
      name: "Light",
      username: "Arpitba1219671",
    },
  ];

  const nextHandler = () => {
    console.log(selectedUsers);
    dispatch(
      createChat(
        selectedUsers.map((el) => el._id),
        selectedUsers.map((el) => el.name.split(" ")[0]).join(","),
        navigate
      )
    );
    setSelectedusers([]);
    closeModal();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as='div'
        className='fixed z-50 inset-0 pt-2'
        onClose={() => {
          closeModal();
          setSelectedusers([]);
        }}
      >
        <div className='flex items-center justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-[#495763] bg-opacity-60 transition-opacity' />
          </Transition.Child>

          <Transition.Child
            className='flex h-screen'
            as='div'
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-86 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-86 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-86 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div className='m-auto mt-auto flex flex-col text-[#d9d9d9] bg-black rounded-2xl text-left shadow-xl transform transition-all h-[650px] w-[600px]'>
              <div className=''>
                <div className='flex items-center pr-7 pl-5 py-3'>
                  {!groupMode ? (
                    <div
                      onClick={() => {
                        closeModal();
                        setSelectedusers([]);
                      }}
                      className='hoverAnim h-9 w-9 flex justify-center items-center xl:px-0'
                    >
                      <XIcon className='h-6' />
                    </div>
                  ) : (
                    <div
                      onClick={() => {
                        toggleGroupMode(false);
                      }}
                      className='hoverAnim h-9 w-9 flex justify-center items-center xl:px-0'
                    >
                      <ArrowLeftIcon className='h-6' />
                    </div>
                  )}
                  {groupMode ? (
                    <div className='ml-6'>
                      <div className='text-lg font-bold'>Create a group</div>
                      <div className='text-xs -mt-1 text-[#71767B]'>
                        Add people
                      </div>
                    </div>
                  ) : (
                    <div className='ml-6'>
                      <div className='text-lg font-bold'>New message</div>
                    </div>
                  )}
                  <button
                    onClick={nextHandler}
                    disabled={selectedUsers.length === 0}
                    className='px-3.5 py-1.5 ml-auto disabled:bg-slate-400 bg-white rounded-full text-black font-bold text-sm disabled:cursor-not-allowed'
                  >
                    Next
                  </button>
                </div>
                <div className='flex px-7 py-3 border-b border-gray-700'>
                  <SearchIcon className='h-5 text-[#1D9BF0]' />
                  <input
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                    }}
                    className='b bg-transparent outline-none w-full px-5 placeholder:text-gray-700'
                    type='text'
                    placeholder='Search here'
                  />
                </div>
                {loading && <SideLoader />}
                {selectedUsers.length > 0 && (
                  <>
                    <div className='flex flex-wrap px-7 pt-1.5 border-b border-gray-700'>
                      {selectedUsers.map((el, index) => (
                        <div
                          onClick={() => {
                            setSelectedusers((prev) => {
                              return prev.filter((res) => res._id !== el._id);
                            });
                          }}
                          key={el._id}
                          className='flex items-center border border-gray-700 rounded-full px-1 py-1 mr-3 mb-2 hover:bg-[#1717298e] hover:opacity-80 hover:cursor-pointer'
                        >
                          <img
                            className='w-6 h-6 rounded-full'
                            src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
                          />
                          <div className='font-bold text-sm ml-2 mr-3'>
                            {el.name}
                          </div>
                          <XIcon className='h-5 text-[#1D9BF0]' />
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {!keyword.trim() && selectedUsers.length === 0 && !groupMode && (
                <div
                  onClick={() => {
                    toggleGroupMode(true);
                  }}
                  className='flex items-center border-b border-gray-700 py-3 px-7 hover:bg-[#1717298e] hover:opacity-80 hover:cursor-pointer'
                >
                  <div className='border rounded-full p-2.5 border-gray-700'>
                    <UserGroupIcon className='h-4 text-[#1D9BF0] m-auto' />
                  </div>
                  <div className='text-[#1D9BF0] font-bold ml-4'>
                    Create a group
                  </div>
                </div>
              )}
              <div className='overflow-y-auto'>
                {keyword &&
                  users &&
                  users.map((el, index) => (
                    <div
                      key={el._id}
                      onClick={(e) => {
                        let olduser = selectedUsers.find(
                          (res) => res._id == el._id
                        );
                        if (!olduser) setSelectedusers((prev) => [...prev, el]);
                        else {
                          setSelectedusers((prev) => {
                            return prev.filter((res) => res._id != el._id);
                          });
                        }
                        setKeyword("");
                      }}
                      className='flex items-center py-3 px-7 hover:bg-[#1717298e] hover:opacity-80 hover:cursor-pointer'
                    >
                      <div className='border-gray-700'>
                        <img
                          className='w-10 h-10 rounded-full'
                          src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
                        />
                      </div>
                      <div className='ml-4'>
                        <div className='font-bold'>{el.name}</div>
                        <div className='text-[#71767B] text-sm -mt-1'>
                          @{el.username}
                        </div>
                      </div>
                    </div>
                  ))}
                {!keyword.trim() &&
                  userss.map((el, index) => (
                    <div
                      // onClick={(e) => {
                      //     console.log(result.name);
                      //     setKeyword("");
                      //   }}
                      key={index}
                      className='flex items-center py-3 px-7 hover:bg-[#1717298e] hover:opacity-80 hover:cursor-pointer'
                    >
                      <div className='border-gray-700'>
                        <img
                          className='w-10 h-10 rounded-full'
                          src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
                        />
                      </div>
                      <div className='ml-4'>
                        <div className='font-bold'>{el.name}</div>
                        <div className='text-[#71767B] text-sm -mt-1'>
                          @{el.username}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default NewMessageModal;
