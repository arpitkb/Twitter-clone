import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { XIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/auth";
import { useCookies } from "react-cookie";
import Loader from "../components/Loader";

const mailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, err } = useSelector((state) => state.auth);
  const [passPage, setpassPage] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [username, setUsername] = useState("");
  const [option, toggleOption] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [cookies, setCookie] = useCookies(["_token"]);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const onLogin = async () => {
    dispatch(loginUser(email, password, username, setCookie));
  };

  return (
    <div className='flex text-white justify-center items-center bg-[#5B708366] h-screen w-screen'>
      {!passPage && (
        <div className='relative bg-black flex flex-col items-center sm:items-start px-[2rem] sm:px-[8rem] w-full sm:w-[600px] h-5/6 rounded-xl pt-[1rem] pb-[6rem]'>
          <div
            onClick={() => {
              navigate("/");
            }}
            className='absolute w-8 h-8 hover:bg-[#d9d9d9] hover:bg-opacity-10 duration-200 rounded-full flex items-center justify-center top-3 left-3 cursor-pointer'
          >
            <XIcon className='text-white h-5' />
          </div>
          <img
            src='https://rb.gy/ogau5a'
            className='se self-center opacity-80 h-8 w-8'
          />

          <div className='mt-20 mb-10 text-[#d9d9d9] font-bold text-xl'>
            Sign in to twitter
          </div>
          <button className='w-full bg-white font-bold py-3 text-black rounded-3xl'>
            <i className='fab fa-google mx-2'></i>Sign in with google
          </button>
          <div className='flex my-3 items-center'>
            <div className='bg-gray-700 h-[1px] w-36'></div>
            <div className='text-[#d9d9d9] mx-2'>or</div>

            <div className='bg-gray-700 h-[1px] w-36'></div>
          </div>
          {!option && (
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className={`outline-none ${
                isTouched && !email.match(mailRegex)
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-700 focus:border-[#1d9bf0]"
              } focus:border-2 w-full bg-transparent border rounded-lg py-4 px-2`}
            />
          )}
          {option && (
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              className='outline-none focus:border-[#1d9bf0] focus:border-2 w-full bg-transparent border border-gray-700 rounded-lg py-4 px-2'
            />
          )}
          <div
            onClick={() => {
              setIsTouched(false);
              setUsername("");
              setEmail("");
              toggleOption(!option);
            }}
            className='text-sm cursor-pointer mt-1 hover:text-[#d9d9d9] text-[#6e767d]'
          >
            {!option ? "Use username instead" : "Use Email"}
            <i className='fas ml-2 fa-sliders-h'></i>
          </div>
          <button
            onClick={() => {
              setIsTouched(true);
              if (username.trim() === "" && !email.match(mailRegex)) return;
              setpassPage(true);
            }}
            className='mt-6 w-full rounded-2xl py-1 bg-[#EFF3F4] text-black font-bold'
          >
            Next
          </button>
          <button className='my-5 w-full rounded-2xl py-1 bg-transparent border border-gray-700 duration-200 hover:bg-gray-300 hover:bg-opacity-10 font-bold'>
            Forgot password
          </button>
          <div className='mt-10 text-[#6e767d] text-sm'>
            Don't have an account?{" "}
            <Link
              className='inline text-[#1d9bf0] hover:underline'
              to='/register'
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
      {passPage && (
        <div className='relative bg-black flex flex-col items-center sm:items-start px-[2rem] w-full sm:w-[600px] h-5/6 rounded-xl py-[1rem]'>
          {loading && <Loader />}
          {!loading && (
            <>
              <div className='absolute w-8 h-8 hover:bg-[#d9d9d9] hover:bg-opacity-10 duration-200 rounded-full flex items-center justify-center top-3 left-3 cursor-pointer'>
                <ArrowLeftIcon
                  onClick={() => {
                    setpassPage(false);
                    setPassowrd("");
                  }}
                  className='text-white h-5'
                />
              </div>
              <img
                src='https://rb.gy/ogau5a'
                className='se self-center opacity-80 h-8 w-8'
              />

              <div className='text-xl my-5 font-bold text-[#d9d9d9]'>
                Enter Your password
              </div>
              {err && (
                <div className='text-red-500 my-4 border rounded-full text-center py-2 w-full bg-[#8a202041] border-red-500'>
                  {err}
                </div>
              )}
              {!option && (
                <input
                  className='bg-transparent my-3 px-3 w-full bg-gray-600 bg-opacity-20 text-[#6e767d] border border-gray-700 rounded-md py-4'
                  value={email}
                  type='email'
                  disabled
                />
              )}
              {option && (
                <input
                  className='bg-transparent my-3 px-3 w-full bg-gray-600 bg-opacity-20 text-[#6e767d] border-gray-700 rounded-md py-4'
                  placeholder='Password'
                  type='text'
                  value={username}
                  disabled
                />
              )}
              <input
                disabled={loading}
                className='bg-transparent mt-3 px-2 w-full outline-none focus:border-[#1d9bf0] focus:border-2 border border-gray-700 rounded-md py-4'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassowrd(e.target.value)}
                type='password'
              />
              <div className='text-sm hover:underline cursor-pointer ml-2 text-[#1d9bf0]'>
                Forgot password?
              </div>
              <button
                onClick={onLogin}
                disabled={password.trim() === ""}
                className='bg-white hover:bg-gray-200 mb-20 disabled:bg-[#d9d9d9] disabled:cursor-not-allowed text-black rounded-full mt-auto w-full py-2'
              >
                login
              </button>
              <div className='text-[#6e767d] '>
                Don't have an account ?{" "}
                <Link
                  className='inline text-[#1d9bf0] hover:underline'
                  to='/register'
                  disabled={loading}
                >
                  Sign up
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
