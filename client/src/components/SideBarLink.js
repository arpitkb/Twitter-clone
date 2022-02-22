import React from "react";
import { Link } from "react-router-dom";

const SideBarLink = ({ text, Icon, active, link }) => {
  return (
    <Link
      to={link}
      className={`text-[#d9d9d9] active:font-bold focus:font-bold flex items-center justify-center xl:justify-start text-xl space-x-4 hoverAnim`}
    >
      <Icon className='h-7' />
      <span className='hidden xl:inline'>{text}</span>
    </Link>
  );
};

export default SideBarLink;
