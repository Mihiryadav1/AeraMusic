import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { BsLeafFill } from "react-icons/bs";
import { MdOutlineAccessTime } from "react-icons/md";
import { PiCirclesFour } from "react-icons/pi";
import { LuHardDriveUpload } from "react-icons/lu";
import { MdMood } from "react-icons/md";
const Sidebar = () => {
  const [active, setActive] = useState("Home");
  return (
    <aside className="secondary h-full w-full rounded-lg md:rounded-2xl py-10 px-4">
      <div className="logo text-2xl text-center mb-10 ">
        <div className="flex items-center justify-center gap-2">
          <span className="  text-3xl text-green-400">
            <BsLeafFill />
          </span>
          <span className="text-white hidden sm:block">AeraMusic</span>
        </div>
      </div>
      <ul className="list-none">
        {/* Sidebar Link */}
        <li
          onClick={() => setActive("Home")}
          className={`mb-5 flex items-center gap-4 rounded-lg px-2 py-2 cursor-pointer transition-colors
            ${active === "Home" ? "bg-[#6FAF86]" : "hover:bg-[#6FAF86]/30"}
          `}
        >
          <span className="icon text-white text-2xl">
            <GoHome />
          </span>
          <Link to="/" className="text-white text-xl hidden lg:inline">
            Home
          </Link>
        </li>
        {/* Sidebar Link */}
        {/* <li className="mb-5 flex items-center gap-4 active:bg-[#6FAF86] rounded-lg px-2 py-1">
          <span className="icon text-white text-2xl">
            <MdOutlineAccessTime />
          </span>
          <Link to="/" className="text-white text-xl hidden lg:inline">
            Session
          </Link>
        </li> */}
        {/* Sidebar Link */}
        {/* <li className="mb-5 flex items-center gap-4 active:bg-[#6FAF86] rounded-lg px-2 py-1">
          <span className="icon text-white text-2xl">
            <PiCirclesFour />
          </span>
          <Link to="/" className="text-white text-xl hidden lg:inline">
            Themes
          </Link>
        </li> */}
        {/* <li className="mb-5 flex items-center gap-4 active:bg-[#6FAF86] rounded-lg px-2 py-1">
          <span className="icon text-white text-2xl">
            <MdMood />
          </span>
          <Link to="/" className="text-white text-xl hidden lg:inline">
            Mood
          </Link>
        </li> */}
        <li  onClick={() => setActive("Upload")}
          className={`mb-5 flex items-center gap-4 rounded-lg px-2 py-2 cursor-pointer transition-colors
            ${active === "Upload" ? "bg-[#6FAF86]" : "hover:bg-[#6FAF86]/30"}
          `}
        >
          <span className="icon text-white text-2xl">
            <LuHardDriveUpload />
          </span>
          <Link to="/" className="text-white text-xl hidden lg:inline">
            Upload Music
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
