import React, { useState, useRef } from "react";
import {
  PhotographIcon,
  XIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import TextareaAutosize from "react-textarea-autosize";

const CreateTweet = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showEmojis, setShowEmojis] = useState(false);
  const [tweet, setTweet] = useState("");

  const imagePickerRef = useRef();

  const imageAdd = (e) => {
    let images = [...e.target.files];
    images = images.map((el) => {
      return { image: el, url: URL.createObjectURL(el) };
    });
    setSelectedImages(images);
  };

  const sendPost = () => {
    if (tweet.trim().length === 0 && selectedImages.length === 0) return;
    console.log(tweet.trim());
    setSelectedImages([]);
    setTweet("");
  };

  const addEmoji = (e) => {
    console.log(e.native);
    setTweet(tweet + e.native);
  };

  const removeImage = (name) => {
    setSelectedImages((prev) => {
      return prev.filter((el) => {
        return el.image.name !== name;
      });
    });
  };

  return (
    <div className={`border-b border-gray-700 p-3 flex space-x-3`}>
      <img
        className='w-12 h-12 rounded-full'
        src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
      />

      <div className='w-full divide-y divide-gray-700'>
        <div className={`mt-3 ${selectedImages.length > 0 && "mb-5"}`}>
          <TextareaAutosize
            value={tweet}
            minRows={2}
            placeholder="What's happening?"
            maxRows={30}
            onChange={(e) => setTweet(e.target.value)}
            className='bg-transparent pb-4 outline-none text-[#d9d9d9] text-xl placeholder-gray-500 tracking-wide w-full'
          />
          {selectedImages.length > 0 && (
            <div className='grid grid-cols-2 gap-2 mb-3'>
              {selectedImages.map((el, index) => (
                <div
                  key={el.url}
                  className='relative overflow-hidden rounded-2xl h-[200px]'
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
                    className='overflow-hidden rounded-2xl object-cover h-[200px]'
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center mt-3'>
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
              {/* <button onClick={haha}> show</button> */}
            </div>

            <div className='icon rotate-90'>
              <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
            </div>

            <div className='icon' onClick={() => setShowEmojis(!showEmojis)}>
              <EmojiHappyIcon className='text-[#1d9bf0] h-[22px]' />
            </div>

            <div className='icon'>
              <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
            </div>

            {showEmojis && (
              <Picker
                onSelect={addEmoji}
                style={{
                  position: "absolute",
                  marginTop: "465px",
                  marginLeft: "-62px",
                  borderRadius: "30px",
                  maxWidth: "319px",
                }}
                theme='dark'
              />
            )}
          </div>
          <button
            className='bg-[#1d9bf0] mt-3 text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
            disabled={tweet.trim().length === 0 && selectedImages.length === 0}
            onClick={sendPost}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTweet;
