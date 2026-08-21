import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
const Header = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return (
    <div className="primary p-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-2/5 md:w-1/3 lg:w-1/5">
          <IoIosSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search a song"
            className="w-full rounded-3xl secondary text-white py-2.5 pl-10 pr-4 outline-none placeholder:text-[16px]"
          />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Profile */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 md:w-12 md:h-12 rounded-full bg-green-400" />

            <div className="flex flex-col">
              <span className="text-sm md:text-base text-white">
                Mihir Yadav
              </span>

              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">
                  {isOnline ? "Online" : "Offline"}
                </span>

                <span
                  className={`w-2 h-2 rounded-full ${
                    isOnline ? "bg-green-400" : "bg-gray-500"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full secondary flex items-center justify-center text-white text-xl md:text-2xl">
              <FaRegHeart />
            </div>

            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full secondary flex items-center justify-center text-white text-xl md:text-2xl">
              <IoSettingsOutline />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
