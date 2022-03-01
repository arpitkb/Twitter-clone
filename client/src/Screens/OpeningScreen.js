import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const OpeningScreen = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className='h-screen w-screen flex'>
      <div className='h-screen overflow-hidden w-[830px] hidden lg:block'>
        <img
          className='object-cover h-screen w-full object-center'
          src='https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png'
          alt=''
        />
      </div>
      <div className='flex flex-col'>
        <div className='m-9'>
          <img src='https://rb.gy/ogau5a' className='h-11 opacity-80' />
        </div>
        <div className='text-[#d9d9d9] text-7xl font-extrabold m-9'>
          Happening now
        </div>
        <div className='text-[#d9d9d9] text-3xl tracking-wider font-extrabold m-9'>
          Join Me today
        </div>
        <div className='ml-9'>
          <button className='bg-white px-[5rem] font-bold py-3 rounded-full'>
            <i className='fab fa-google mx-2'></i>Sign up with google
          </button>
        </div>
        <div className='flex ml-12 my-3 items-center'>
          <div className='bg-gray-700 h-[2px] w-36'></div>
          <div className='text-[#d9d9d9] mx-2'>or</div>

          <div className='bg-gray-700 h-[2px] w-36'></div>
        </div>
        <div className='ml-9 mt-3'>
          <Link
            to='/register'
            className='bg-[#1d9bf0] duration-200 hover:bg-[#1a85cc] px-[4rem] text-white font-bold py-3 rounded-full'
          >
            Sign up with phone or email
          </Link>
        </div>

        <div className='text-[#d9d9d9] font-bold ml-9 mt-20 mb-3'>
          Already have an account?
        </div>
        <div className='ml-9 mt-3'>
          <Link
            to='/login'
            className='border border-gray-700 duration-200 hover:bg-gray-300 hover:bg-opacity-10 px-[8.8rem] text-[#1d9bf0] font-bold py-3 rounded-3xl'
          >
            Sign in?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OpeningScreen;
