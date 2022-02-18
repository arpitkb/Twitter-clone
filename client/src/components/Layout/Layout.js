import React from "react";
import Feed from "../Feed";
import SideBar from "../SideBar";

const Layout = () => {
  return (
    <div className='b min-h-screen flex max-w-1500 mx-auto'>
      {/* Sidebar */}
      <SideBar />
      {/* Feed */}
      <Feed />
      {/* <div className='text-[#d9d9d9] bg-black hidden w-[150px] sm:flex flex-col items-center xl:items-start xl:w-[520px] p-2 h-full'></div> */}
      {/* Widgets */}
      {/* Modal */}
    </div>
  );
};

export default Layout;
