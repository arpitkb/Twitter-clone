import { SearchIcon } from "@heroicons/react/outline";
import { useState, useRef,useEffect } from "react";
import Trending from "./Trending";
import Loader from './Loader'
import {useSelector, useDispatch} from 'react-redux'
import {getUsersByKeyword} from '../redux/actions/user'
import {useNavigate} from 'react-router-dom'

const  Widgets=()=> {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref= useRef()
  const ref2= useRef()
 
  const {loading,users,err} = useSelector(state=>state.users)

  const followResults=[]

  const trendingResults = [
    {
      tags: ["#xf", "#sdx"],
      description: "hahaha",
      heading: "Heading",
    },
    {
      tags: [],
      description: "hahaha",
      heading: "Heading",
    },
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [keyword,setKeyword] = useState('')
  const [l ,setL]= useState(false)

  useEffect(()=>{
    setL(true)
    const request = setTimeout(() => {
    dispatch(getUsersByKeyword(keyword))
    setL(false)
    }, 250);
    
    return ()=>{clearTimeout(request)}

  },[keyword])

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (showSearch && ref.current && !ref.current.contains(e.target) && ref2.current && !ref2.current.contains(e.target)) {
        setShowSearch(false)
      }
    }

    document.addEventListener("click", checkIfClickedOutside,true)
    return () => {
      document.removeEventListener("click", checkIfClickedOutside,true)
    }
  }, [showSearch])


  const inputChangeHandler= async(e)=>{
    setKeyword(e.target.value)
    // console.log(showSearch)
    // dispatch(getUsersByKeyword(e.target.value))
  }

  return (
    <div className='relative hidden ml-3 lg:flex flex-col items-center md:min-w-[350px] xl:w-[450px] py-1 space-y-5 '>
      <div className='sticky top-0 py-1.5 bg-black z-50 w-11/12 xl:w-10/12'>
        <div className='flex items-center bg-[#202327] p-3 rounded-full relative'>
          <SearchIcon className='text-gray-500 h-5 z-50' />
          <input
          ref={ref}
            type='text'
            onClick={(e) => {
              setShowSearch(true);
            }}
            value={keyword}
            onChange={inputChangeHandler}
            className='bg-transparent placeholder-gray-500 outline-none text-[#d9d9d9] absolute inset-0 pl-11 border border-transparent w-full focus:border-[#1d9bf0] rounded-full focus:bg-black focus:shadow-lg'
            placeholder='Search Twitter'
          />
        </div>
        {showSearch && (
        <div
          ref={ref2}
          style={{ zIndex: "51" }}
          className='absolute text-[#d9d9d9] min-h-[110px] max-h-[500px] overflow-auto top-13 space-y-3 bg-black border drop-shadow-[0px_0px_7px_rgba(255,255,255,0.25)] border-gray-700 py-2 rounded-xl w-full'
        >
        {loading && keyword.trim() && <div className='px-4 py-2 animate-pulse flex items-center'>
          <div className='rounded-full bg-slate-700 w-12 h-12 opacity-[0.5]'></div>
          <div className='ml-4 flex flex-col space-y-2 group'>
            <div className='h-4 w-32 bg-slate-700 rounded-2xl'></div>
            <div className='h-3 w-16 bg-slate-700 rounded-2xl'></div>
          </div>
        </div>}
        {!keyword.trim() &&<div className='text-center text-[#6e767d]'>Enter username or email</div>}
        {!l && !loading && keyword.trim()&& users.length===0 &&<div className='text-center text-[#6e767d]'>No users found</div> }
          {keyword && users && users.map((result, index) => (
            <div
              onClick={
                (e)=>{
                  e.stopPropagation()
                  navigate(`/${result.username}`)
                  setKeyword('')
                  setShowSearch(false)
                }
              }
              className='hover:bg-white hover:bg-opacity-[0.1] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center'
              key={index}
            >
              <img
                src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
                // objectFit='cover'
                className='rounded-full object-cover w-12 h-12'
              />
              <div className='ml-4 leading-5 group'>
                <h4 className='font-bold'>
                  {result.name}
                </h4>
                <h5 className='text-gray-500 text-[15px]'>@{result.username}</h5>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
      

      <div className='text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-10/12'>
        <h4 className='font-bold text-xl px-4'>What's happening</h4>
        {trendingResults.map((result, index) => (
          <Trending key={index} result={result} />
        ))}
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light'>
          Show more
        </button>
      </div>

      <div className='text-[#d9d9d9] space-y-3 bg-[#15181c] pt-2 rounded-xl w-11/12 xl:w-10/12'>
        <h4 className='font-bold text-xl px-4'>Who to follow</h4>
        {followResults.map((result, index) => (
          <div
            className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-2 cursor-pointer transition duration-200 ease-out flex items-center'
            key={index}
          >
            <img
              src='https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/13/1490989105-twitter1.jpg?resize=768:*'
              objectFit='cover'
              className='rounded-full w-11 h-11'
            />
            <div className='ml-4 leading-5 group'>
              <h4 className='font-bold group-hover:underline'>
                {result.username}
              </h4>
              <h5 className='text-gray-500 text-[15px]'>{result.tag}</h5>
            </div>
            <button className='ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5'>
              Follow
            </button>
          </div>
        ))}
        <button className='hover:bg-white hover:bg-opacity-[0.03] px-4 py-3 cursor-pointer transition duration-200 ease-out flex items-center justify-between w-full text-[#1d9bf0] font-light'>
          Show more
        </button>
      </div>
    </div>
  );
}

export default Widgets;
