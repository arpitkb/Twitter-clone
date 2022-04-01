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
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../redux/actions/post";

const CreateTweetModal = () => {
  const dispatch = useDispatch();
  const { loading, err } = useSelector((state) => state.createPost);
  const [post, setPost] = useState("");
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);

  const [showEmojis, setShowEmojis] = useState(false);

  const imagePickerRef = useRef();
  const ref1 = useRef();

  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    navigate("/home");
  };

  const sendPost = () => {
    if (post.trim().length === 0 && selectedImages.length === 0) return;

    dispatch(
      createPost(
        post.trim(),
        selectedImages.map((el) => el.url)
      )
    ).then(() => {
      closeModal();
    });
  };

  const imageAdd = (e) => {
    let images = [...e.target.files];
    images = images.map((el) => {
      return { image: el, url: URL.createObjectURL(el) };
    });
    setSelectedImages(images);
  };

  const addEmoji = (e) => {
    console.log(e.native);
    setPost(post + e.native);
  };

  const removeImage = (name) => {
    setSelectedImages((prev) => {
      return prev.filter((el) => {
        return el.image.name !== name;
      });
    });
  };

  // removing emoji picker on outside click
  useEffect(
    (e) => {
      const checkIfClickedOutside = (e) => {
        if (showEmojis && ref1.current && !ref1.current.contains(e.target)) {
          setShowEmojis(false);
        }
      };

      document.addEventListener("click", checkIfClickedOutside, true);
      return () => {
        document.removeEventListener("click", checkIfClickedOutside, true);
      };
    },
    [showEmojis]
  );

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as='div' className='fixed z-50 inset-0 pt-2' onClose={closeModal}>
        <div className='relative flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
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
              className={`inline-block align-bottom bg-black rounded-2xl text-left overflow-auto max-h-[650px] shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-[600px] sm:w-full ${
                loading && "opacity-60"
              }`}
            >
              <div className='flex items-center px-1.5 py-2'>
                <div
                  className='hoverAnim w-9 h-9 flex items-center justify-center xl:px-0'
                  onClick={() => {
                    closeModal();
                  }}
                >
                  <XIcon className='h-[20px] text-gray-200' />
                </div>
              </div>
              <div className='flex px-4 pt-0 pb-2.5 sm:px-6'>
                <div className='w-full'>
                  <div className='mt-0 flex space-x-3 w-full'>
                    <img
                      src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
                      alt=''
                      className='h-12 w-12 rounded-full'
                    />
                    <div className='flex-grow mt-2'>
                      <TextareaAutosize
                        value={post}
                        minRows={3}
                        disabled={loading}
                        style={{ resize: "none" }}
                        placeholder="What's Happening?"
                        maxRows={30}
                        onChange={(e) => setPost(e.target.value)}
                        className='bg-transparent outline-none pb-3 text-[#d9d9d9] text-xl placeholder-gray-500 tracking-wide w-full'
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

                      {!loading && (
                        <div className='flex items-center justify-between pt-2.5 border-t border-gray-700'>
                          <div className='flex items-center'>
                            <div
                              className='icon cursor-pointer'
                              onClick={(e) => {
                                e.stopPropagation();
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

                            <div className='icon'>
                              <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
                            </div>
                          </div>
                          <button
                            className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
                            type='submit'
                            onClick={sendPost}
                            disabled={
                              post.trim().length === 0 &&
                              selectedImages.length === 0
                            }
                          >
                            Tweet
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>

          {showEmojis && (
            <div ref={ref1} className='absolute left-1/3 top-1/3'>
              <Picker
                onSelect={addEmoji}
                style={{
                  // marginTop: "465px",
                  // marginLeft: "62px",
                  borderRadius: "30px",
                  maxWidth: "319px",
                }}
                theme='dark'
              />
            </div>
          )}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CreateTweetModal;
