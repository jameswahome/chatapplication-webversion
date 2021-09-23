import React, { useEffect, useRef, useContext } from "react";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";
function Sidebar({ sidebarOpen, setSidebarOpen, setalltickets, setmessages }) {
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/")[1];
  const history = useHistory();
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const contextType = useContext(AuthContext);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="lg:w-80">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-white transition-transform duration-200 ease-in-out pt-4 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-black hover:text-blue bg-white"
            onClick={() => setSidebarOpen(false)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink exact to="/messages" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                  <stop stopColor="#A5B4FC" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                  <stop stopColor="#38BDF8" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs uppercase text-black font-semibold pl-3">
            Pages
          </h3>

          <div className="w-full  ">
            <div className="relative">
              {" "}
              <input
                type="text"
                className="w-full h-12 rounded focus:outline-none px-3 focus:shadow-md"
                placeholder="Search..."
              />{" "}
              <svg
                className="w-5 h-5 absolute right-3 top-4 text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <i className="fa fa-search absolute right-3 top-4 text-gray-300"></i>{" "}
            </div>
            <ul className="  pl-2">
              <li className="flex justify-between mt-2 pt-2 bg-white  hover:shadow-lg rounded cursor-pointer transition">
                <div className="flex ">
                  {" "}
                  <img
                    src="https://i.imgur.com/aq39RMA.jpg"
                    className="rounded-full h-8 w-8"
                    alt="img"
                  />
                  <div className="flex flex-col ml-2">
                    {" "}
                    <span className="font-medium text-black">
                      Jessica Koel
                    </span>{" "}
                    <span className="text-sm text-gray-400 truncate w-32">
                      Hey, Joel, I here to help you out please tell me
                    </span>{" "}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <span className="text-gray-300">11:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between items-center bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <div className="flex ">
                  {" "}
                  <img
                    src="https://i.imgur.com/eMaYwXn.jpg"
                    className="rounded-full h-8 w-8"
                    alt="img"
                  />
                  <div className="flex flex-col ml-2">
                    {" "}
                    <span className="font-medium text-black">
                      Komeial Bolger
                    </span>{" "}
                    <span className="text-sm text-gray-400 truncate w-32">
                      I will send you all documents as soon as possible
                    </span>{" "}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <span className="text-gray-300">12:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between items-center bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <div className="flex ">
                  {" "}
                  <img
                    src="https://i.imgur.com/zQZSWrt.jpg"
                    className="rounded-full h-8 w-8"
                    alt="img"
                  />
                  <div className="flex flex-col ml-2">
                    {" "}
                    <span className="font-medium text-black">
                      Tamaara Suiale
                    </span>{" "}
                    <span className="text-sm text-gray-400 truncate w-32">
                      Are you going to business trip next week
                    </span>{" "}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <span className="text-gray-300">8:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between items-center bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <div className="flex ">
                  {" "}
                  <img
                    src="https://i.imgur.com/agRGhBc.jpg"
                    className="rounded-full h-8 w-8"
                    alt="img"
                  />
                  <div className="flex flex-col ml-2">
                    {" "}
                    <span className="font-medium text-black">
                      Sam Nielson
                    </span>{" "}
                    <span className="text-sm text-gray-400 truncate w-32">
                      I suggest to start new business soon
                    </span>{" "}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <span className="text-gray-300">7:16</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between items-center bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <div className="flex ">
                  {" "}
                  <img
                    src="https://i.imgur.com/uIgDDDd.jpg"
                    className="rounded-full h-8 w-8"
                    alt="img"
                  />
                  <div className="flex flex-col ml-2">
                    {" "}
                    <span className="font-medium text-black">
                      Caroline Nexon
                    </span>{" "}
                    <span className="text-sm text-gray-400 truncate w-32">
                      We need to start new reseatch center.
                    </span>{" "}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <span className="text-gray-300">9:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between items-center bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <div className="flex ">
                  {" "}
                  <img
                    src="https://i.imgur.com/tT8rjKC.jpg"
                    className="rounded-full h-8 w-8"
                    alt="img"
                  />
                  <div className="flex flex-col ml-2">
                    {" "}
                    <span className="font-medium text-black">
                      Patrick Koeler
                    </span>{" "}
                    <span className="text-sm text-gray-400 truncate w-32">
                      May be yes
                    </span>{" "}
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  {" "}
                  <span className="text-gray-300">3:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
