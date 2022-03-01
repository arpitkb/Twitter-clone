import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef, useEffect } from "react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { setreplymodal } from "../redux/actions/modal";

function Modal({ isOpen, closeModal }) {
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedImages, setSelectedImages] = useState([]);

  const [showEmojis, setShowEmojis] = useState(false);

  const imagePickerRef = useRef();

  const imageAdd = (e) => {
    let images = [...e.target.files];
    images = images.map((el) => {
      return { image: el, url: URL.createObjectURL(el) };
    });
    setSelectedImages(images);
  };

  const addEmoji = (e) => {
    console.log(e.native);
    setComment(comment + e.native);
  };

  const removeImage = (name) => {
    setSelectedImages((prev) => {
      return prev.filter((el) => {
        return el.image.name !== name;
      });
    });
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed z-50 inset-0 pt-2' onClose={closeModal}>
        <div className='flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity' />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <div
              onClick={() => setShowEmojis(false)}
              className='inline-block align-bottom bg-black rounded-2xl text-left overflow-auto max-h-[650px] shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[600px] sm:w-full'
            >
              <div className='flex items-center px-1.5 py-2'>
                <div
                  onClick={() => {
                    closeModal();
                  }}
                  className='hoverAnim w-9 h-9 flex items-center justify-center xl:px-0'
                >
                  <XIcon className='h-[20px] text-gray-200' />
                </div>
              </div>
              <div className='flex px-4 pt-5 pb-2.5 sm:px-6'>
                <div className='w-full'>
                  <div className='text-[#6e767d] flex gap-x-3 relative'>
                    <span className='w-[1.75px] h-full  z-[-1] absolute left-5 top-[3rem] bg-gray-700' />
                    <img
                      src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
                      alt=''
                      className='h-11 w-11 rounded-full'
                    />
                    <div>
                      <div className='inline-block group'>
                        <h4 className='font-bold text-[#d9d9d9] inline-block text-[15px] sm:text-base'>
                          {post?.username}Light
                        </h4>
                        <span className='ml-1.5 text-sm sm:text-[15px]'>
                          @{post?.tag} hayli
                        </span>
                      </div>{" "}
                      ·{" "}
                      <span className='hover:underline text-sm sm:text-[15px]'>
                        Jan 9
                      </span>
                      <p className='text-[#d9d9d9] text-[15px] sm:text-base'>
                        {post?.text}hahaha looool!! So you know there is this
                        guy that is so hot ad smart that i want to make friends
                        with but i don't know how to becaus so hot ad
                        smartecause So you know there is this guy that is so hot
                        ad sm
                      </p>
                    </div>
                  </div>

                  <div className='mt-7 flex space-x-3 w-full'>
                    <img
                      src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
                      alt=''
                      className='h-11 w-11 rounded-full'
                    />
                    <div className='flex-grow mt-2'>
                      <TextareaAutosize
                        value={comment}
                        minRows={3}
                        placeholder='Tweet your reply'
                        maxRows={30}
                        onChange={(e) => setComment(e.target.value)}
                        // onHeightChange={onHeightChangeEvent}
                        className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full'
                      />

                      {selectedImages.length > 0 && (
                        <div className='grid grid-cols-2 gap-2 my-3'>
                          {selectedImages.map((el, index) => (
                            <div
                              key={el.url}
                              className='relative overflow-hidden rounded-2xl h-[130px]'
                            >
                              <div className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'>
                                <XIcon
                                  className='text-white h-5'
                                  onClick={() => {
                                    removeImage(el.image.name);
                                  }}
                                />
                              </div>
                              <img
                                src={el.url}
                                alt=''
                                className='overflow-hidden rounded-2xl object-cover h-[150px]'
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className='flex items-center justify-between pt-2.5'>
                        <div className='flex items-center'>
                          <div
                            className='icon cursor-pointer'
                            onClick={() => {
                              setShowEmojis(false);
                              imagePickerRef.current.click();
                            }}
                          >
                            <PhotographIcon className='text-[#1d9bf0] h-[22px]' />
                            <input
                              type='file'
                              hidden
                              accept='image/*'
                              onChange={imageAdd}
                              multiple
                              ref={imagePickerRef}
                            />
                          </div>

                          <div className='icon rotate-90'>
                            <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
                          </div>

                          <div
                            className='icon'
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowEmojis(!showEmojis);
                            }}
                          >
                            <EmojiHappyIcon className='text-[#1d9bf0] h-[22px]' />
                          </div>
                          {showEmojis && (
                            <Picker
                              onSelect={addEmoji}
                              style={{
                                position: "absolute",
                                marginTop: "-470px",
                                marginLeft: "-62px",
                                borderRadius: "30px",
                                maxWidth: "320px",
                                zIndex: "101",
                              }}
                              theme='dark'
                            />
                          )}

                          <div className='icon'>
                            <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
                          </div>
                        </div>
                        <button
                          className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
                          type='submit'
                          // onClick={sendComment}
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
