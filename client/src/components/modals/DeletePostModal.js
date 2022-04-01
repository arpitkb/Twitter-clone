import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { deletePost } from "../../redux/actions/post";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DeletePostModal = ({ isOpen, closeModal, id, redirectOnDelete }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unfollowHandler = () => {
    dispatch(deletePost(id));

    closeModal();
    if (redirectOnDelete) {
      navigate("/home");
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed z-50 inset-0 pt-2' onClose={closeModal}>
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
            <Dialog.Overlay className='fixed inset-0 bg-[#495763] bg-opacity-80 transition-opacity' />
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
            <div className='m-auto mt-auto text-[#d9d9d9] bg-black rounded-2xl text-left shadow-xl transform transition-all max-w-[330px]'>
              <div className='flex flex-col px-7 py-8 space-y-4'>
                <div className='text-xl font-bold'>Delete Tweet?</div>
                <div className='text-[#6e767d] text-sm'>
                  This can’t be undone and it will be removed from your profile,
                  the timeline of any accounts that follow you, and from Twitter
                  search results
                </div>
                <button
                  onClick={unfollowHandler}
                  className='hover:bg-[#dc1e29] bg-[#f4212e] py-2 text-white rounded-full'
                >
                  Delete
                </button>
                <button
                  onClick={closeModal}
                  className='border rounded-full hover:bg-gray-400 hover:bg-opacity-10 py-2 border-gray-600'
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default DeletePostModal;
