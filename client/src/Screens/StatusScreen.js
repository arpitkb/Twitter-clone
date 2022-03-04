import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPost } from "../redux/actions/post";
import Loader from "../components/Loader";

const StatusScreen = () => {
  const navigate = useNavigate();
  // const [post, setPost] = useState(null);

  const { tweetId } = useParams();
  const dispatch = useDispatch();
  const { loading, post, err } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPost(tweetId));
  }, []);

  return (
    <div className='text-white flex-grow border-l border-r border-gray-700 md:min-w-[580px] max-w-[620px]'>
      <div className='backdrop-blur-[12px] bg-black bg-opacity-60 flex justify-start items-center px-3 py-2 text-[#d9d9d9] sticky top-0 z-50'>
        <div
          onClick={() => {
            navigate(-1);
          }}
          className='hoverAnim h-9 w-9 flex justify-center ms-0 items-center xl:px-0'
        >
          <ArrowLeftIcon className='h-5' />
        </div>
        <div className='font-bold text-xl mx-6'>Tweet</div>
      </div>
      {/* <CreateTweet /> */}
      {loading && (
        <div className='text-center'>
          <Loader />
        </div>
      )}
      <div className='pb-72'>
        {/* <Post onComment={showModal} postPage={false} /> */}
        {post && <Post postPage={true} post={post} />}
      </div>
    </div>
  );
};

export default StatusScreen;
