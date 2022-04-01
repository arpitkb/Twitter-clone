import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, XIcon } from "@heroicons/react/outline";

import { months } from "../utils/dob";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/auth";

import { useCookies } from "react-cookie";

const SigninScreen = () => {
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [days, setDays] = useState(31);
  const [birthDate, setBirthDate] = useState({
    date: -1,
    month: -1,
    year: -1,
  });
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("Arpit65897");
  const [isUsernameInvalid, setIsUsernameInvalid] = useState(false);
  // const [err, setErr] = useState(null);
  const [t1, setT1] = useState(false);
  const [t2, setT2] = useState(false);

  const [cookies, setCookie] = useCookies(["_token"]);

  const navigate = useNavigate();
  const mialRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;

  const { user, loading, err } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && page != 4) {
      navigate("/home");
    }
  }, [user, page]);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const page1to2 = () => {
    setT1(true);
    if (
      name.trim() === "" ||
      !email.match(mialRegex) ||
      Number(birthDate.date) === -1 ||
      Number(birthDate.month) === -1 ||
      Number(birthDate.year) === -1
    )
      return;

    setPage(2);
  };

  const page3to4 = () => {
    setT2(true);
    if (!password.match(passRegex)) return;
    const dob = `${birthDate.year}-${birthDate.month}-${birthDate.date}`;
    // console.log(name, email, password, dob);
    dispatch(registerUser(name, email, password, dob, setCookie));
    setPage(4);
  };

  return (
    <div className='flex text-white justify-center items-center bg-[#5B708366] h-screen w-screen'>
      {page === 0 && (
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
            Join twitter today
          </div>
          <button className='w-full bg-white font-bold py-3 text-black rounded-3xl'>
            <i className='fab fa-google mx-2'></i>Sign up with google
          </button>
          <div className='flex my-3 items-center'>
            <div className='bg-gray-700 h-[1px] w-36'></div>
            <div className='text-[#d9d9d9] mx-2'>or</div>

            <div className='bg-gray-700 h-[1px] w-36'></div>
          </div>
          <button
            onClick={() => {
              setPage(1);
            }}
            className='w-full bg-white font-bold py-3 text-black rounded-3xl'
          >
            Sign up with phone or email
          </button>
          <div className='text-[#6e767d] text-xs mt-2 px-3'>
            By signing up, you agree to the{" "}
            <span className='text-[#1d9bf0]'>Terms of Service</span> and{" "}
            <span className='text-[#1d9bf0]'>Privacy Policy</span>, including{" "}
            <span className='text-[#1d9bf0]'>Cookie Use.</span>
          </div>
          <div className='mt-10 text-[#6e767d] text-sm'>
            Have an account already?{" "}
            <Link className='inline text-[#1d9bf0] hover:underline' to='/login'>
              Sign in
            </Link>
          </div>
        </div>
      )}
      {page === 1 && (
        <div className='relative bg-black flex flex-col items-start px-[2rem] w-full sm:w-[600px] h-5/6 rounded-xl py-[1rem]'>
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
            className='mx-auto opacity-80 h-8 w-8'
          />
          <div className='text-2xl my-5 font-bold text-[#d9d9d9]'>
            Create your account
          </div>
          <input
            className={`bg-transparent mb-4 px-2 w-full outline-none focus:border-2 border ${
              t1 && name.trim() === ""
                ? "border-red-500 focus:border-red-500"
                : "border-gray-700 focus:border-[#1d9bf0]"
            } rounded-md py-4`}
            placeholder='Name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={`bg-transparent px-2 w-full outline-none ${
              t1 && !email.match(mialRegex)
                ? "border-red-500 focus:border-red-500"
                : "border-gray-700 focus:border-[#1d9bf0]"
            } focus:border-2 border rounded-md py-4`}
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type='text'
          />
          <div className='text- mt-10 font-bold text-[#d9d9d9]'>
            Date of birth
          </div>
          <div className='text-sm mb-3 text-[#6e767d]'>
            This will not be shown publicly. Confirm your own age, even if this
            account is for a business, a pet, or something else.
          </div>
          <div className='w-full grid grid-cols-4 gap-4'>
            <div className='col-span-4 sm:col-span-2'>
              <select
                placeholder='Month'
                onChange={(e) => {
                  setBirthDate({ ...birthDate, month: e.target.value });
                  let m = e.target.value;
                  if (m != 1) setDays(months[m][1]);
                  else {
                    if (birthDate.year == -1 || birthDate.year % 4 === 0)
                      setDays(29);
                    else setDays(28);
                  }
                }}
                value={birthDate.month}
                className={`outline-none focus:border-2 bg-transparent border w-full py-4 px-2 rounded-md ${
                  t1 && Number(birthDate.month) === -1
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-700 focus:border-[#1d9bf0]"
                }`}
              >
                <option value='-1'>Month</option>
                {months.map((el, index) => (
                  <option key={el[0]} className='bg-black' value={index}>
                    {el[0]}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <select
                onChange={(e) => {
                  setBirthDate({ ...birthDate, date: e.target.value });
                }}
                value={birthDate.date}
                placeholder='Date'
                className={`outline-none focus:border-2 bg-transparent border w-full py-4 px-2 rounded-md ${
                  t1 && Number(birthDate.date) === -1
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-700 focus:border-[#1d9bf0]"
                }`}
              >
                <option value=''>Date</option>
                {Array.from(Array(days).keys()).map((el) => (
                  <option key={el} className='bg-black' value={el + 1}>
                    {el + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className='col-span-2 sm:col-span-1'>
              <select
                placeholder='Year'
                onChange={(e) => {
                  setBirthDate({ ...birthDate, year: e.target.value });
                  if (birthDate.month == 1 && e.target.value % 4 === 0)
                    setDays(29);
                  else if (birthDate.month == 1 && e.target.value % 4 !== 0)
                    setDays(28);
                }}
                value={birthDate.year}
                className={`outline-none focus:border-2 bg-transparent border w-full py-4 px-2 rounded-md ${
                  t1 && Number(birthDate.year) === -1
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-700 focus:border-[#1d9bf0]"
                }`}
              >
                <option value={-1}>Year</option>
                {birthDate.month == 1 && birthDate.date == 29
                  ? Array.from(Array(121).keys())
                      .reverse()
                      .map((el) => {
                        if ((el + 1902) % 4 === 0) {
                          return (
                            <option
                              key={el}
                              className='bg-black'
                              value={el + 1902}
                            >
                              {el + 1902}
                            </option>
                          );
                        }
                      })
                  : Array.from(Array(121).keys())
                      .reverse()
                      .map((el) => (
                        <option key={el} className='bg-black' value={el + 1902}>
                          {el + 1902}
                        </option>
                      ))}
              </select>
            </div>
          </div>
          <button
            onClick={page1to2}
            className='bg-white mb-5 hover:bg-gray-200 font-bold text-black rounded-full mt-auto w-full py-2'
          >
            Next
          </button>
        </div>
      )}
      {page === 2 && (
        <div className='relative bg-black flex flex-col items-start px-[2rem] w-full sm:w-[600px] h-5/6 rounded-xl py-[1rem]'>
          <div className='absolute w-8 h-8 hover:bg-[#d9d9d9] hover:bg-opacity-10 duration-200 rounded-full flex items-center justify-center top-3 left-3 cursor-pointer'>
            <ArrowLeftIcon
              onClick={() => {
                setPage(1);
              }}
              className='text-white h-5'
            />
          </div>
          <img
            src='https://rb.gy/ogau5a'
            className='mx-auto opacity-80 h-8 w-8'
          />
          <div className='text-2xl my-5 font-bold text-[#d9d9d9]'>
            Create your account
          </div>
          <input
            className={`bg-transparent text-[#d9d9d9] mb-4 px-2 w-full outline-none focus:border-[#1d9bf0] focus:border-2 border ${
              t1 && name.trim() === "" ? "border-red" : "border-gray-700"
            } rounded-md py-4`}
            placeholder='Name'
            type='text'
            value={name}
            disabled
          />
          <input
            className='bg-transparent text-[#d9d9d9] mb-4 px-2 w-full outline-none focus:border-[#1d9bf0] focus:border-2 border border-gray-700 rounded-md py-4'
            placeholder='Email'
            type='text'
            value={email}
            disabled
          />
          <input
            className='bg-transparent text-[#d9d9d9] px-2 w-full outline-none focus:border-[#1d9bf0] focus:border-2 border border-gray-700 rounded-md py-4'
            placeholder='DOB'
            type='text'
            value={`${birthDate.date} ${months[Number(birthDate.month)][0]} ${
              birthDate.year
            }`}
            disabled
          />

          <button
            onClick={() => {
              setPage(3);
            }}
            className='bg-white mb-5 hover:bg-gray-200 font-bold text-black rounded-full mt-auto w-full py-2'
          >
            Next
          </button>
        </div>
      )}
      {page === 3 && (
        <div className='relative bg-black flex flex-col items-start px-[2rem] w-full sm:w-[600px] h-5/6 rounded-xl py-[1rem]'>
          <div className='absolute w-8 h-8 hover:bg-[#d9d9d9] hover:bg-opacity-10 duration-200 rounded-full flex items-center justify-center top-3 left-3 cursor-pointer'>
            <ArrowLeftIcon
              onClick={() => {
                setPage(2);
                setT2(false);
              }}
              className='text-white h-5'
            />
          </div>
          <img
            src='https://rb.gy/ogau5a'
            className='mx-auto opacity-80 h-8 w-8'
          />
          {err && (
            <div className='text-red-500 my-4 border rounded-full text-center py-2 w-full bg-[#8a202041] border-red-500'>
              {err}
            </div>
          )}
          <div className='text-2xl mt-5 font-bold text-[#d9d9d9]'>
            Set Password
          </div>
          <div className='mb-5 text-sm text-[#6e767d]'>
            Password must be between 7 to 15 characters which contain at least
            one numeric digit and a special character
          </div>
          <input
            className={`bg-transparent text-[#d9d9d9] mb-4 px-2 w-full outline-none ${
              t2 && !password.match(passRegex)
                ? "border-red-500 focus:border-red-500"
                : "border-gray-700 focus:border-[#1d9bf0]"
            } focus:border-2 border rounded-md py-4`}
            placeholder='Password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={page3to4}
            className='bg-white mb-5 hover:bg-gray-200 font-bold text-black rounded-full mt-auto w-full py-2'
          >
            Sign up
          </button>
        </div>
      )}
      {page === 4 && (
        <div className='bg-black flex flex-col items-start px-[2rem] w-full sm:w-[600px] h-5/6 rounded-xl py-[1rem]'>
          <img
            src='https://rb.gy/ogau5a'
            className='mx-auto opacity-80 h-8 w-8'
          />
          <div className='text-2xl mt-5 font-bold text-[#d9d9d9]'>
            Would you like to update your username?
          </div>
          <div className='mb-5 text-sm text-[#6e767d]'>
            it can't be changed later also
          </div>
          <input
            className={`bg-transparent ${
              isUsernameInvalid
                ? "border-red-500 focus:border-red-500"
                : "focus:border-[#1d9bf0] border-gray-700"
            } text-[#d9d9d9] px-2 w-full outline-none  focus:border-2 border rounded-md py-4`}
            placeholder='Username'
            type='text'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setIsUsernameInvalid(e.target.value.trim() === "");
            }}
          />
          {isUsernameInvalid && username.trim() !== "" && (
            <div className='mb-4 text-red-500 text-sm'>
              username already exists
            </div>
          )}

          <button
            onClick={() => {
              setPage(4);
            }}
            className='bg-[#1d9bf0] mt-4 duration-200 hover:bg-[#1a85cc] px-[4rem] text-white font-bold py-2 w-full rounded-full'
          >
            Update
          </button>
          <button
            onClick={() => {
              navigate("/home");
            }}
            className='bg-white mb-5 hover:bg-gray-200 duration-200 font-bold text-black rounded-full mt-auto w-full py-2'
          >
            skip
          </button>
        </div>
      )}
    </div>
  );
};

export default SigninScreen;
