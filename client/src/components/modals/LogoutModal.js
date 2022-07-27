import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { logoutUser } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

const LogoutModal = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(["_token"]);

  const logout = () => {
    dispatch(logoutUser(setCookie));
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
                <div className='text-xl font-bold'>Logout of Twitter?</div>
                <div>
                  You can always log back in at any time. If you just want to
                  switch accounts, you can do that by adding an existing
                  account.
                </div>
                <button
                  onClick={logout}
                  className='hover:bg-[#d9d9d9] bg-white py-2 text-black rounded-full'
                >
                  Logout
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

export default LogoutModal;
