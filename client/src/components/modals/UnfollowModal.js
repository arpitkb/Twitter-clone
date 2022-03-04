import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toggleFollow } from "../../redux/actions/user";
import { useDispatch } from "react-redux";

const UnfollowModal = ({ isOpen, closeModal, username, _id }) => {
  const dispatch = useDispatch();

  const unfollowHandler = () => {
    dispatch(toggleFollow(_id));
    closeModal();
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
            <div className='m-auto mt-auto text-[#d9d9d9] bg-black rounded-2xl text-left shadow-xl transform transition-all max-w-[350px]'>
              <div className='flex flex-col px-7 py-8 space-y-4'>
                <img
                  src='https://rb.gy/ogau5a'
                  className='se self-center opacity-80 h-8 w-8'
                />
                <div className='text-2xl'>Unfollow @{username}?</div>
                <div>
                  Their Tweets will no longer show up in your home timeline. You
                  can still view their profile.
                </div>
                <button
                  onClick={unfollowHandler}
                  className='hover:bg-[#d9d9d9] bg-white py-2 text-black rounded-full'
                >
                  Unfollow
                </button>
                <button
                  onClick={closeModal}
                  className='border rounded-full hover:bg-gray-500 hover:bg-opacity-10 py-2 border-gray-600'
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

export default UnfollowModal;
