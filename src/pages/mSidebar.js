import React, { useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";
function Sidebar({ sidebarOpen, setSidebarOpen, setalltickets, setmessages }) {
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
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-full flex-shrink-0 bg-white transition-transform duration-200 ease-in-out pt-4 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          <img
            src="https://i.imgur.com/aq39RMA.jpg"
            className="rounded-full h-8 w-8 ml-2"
            alt="img"
          />

          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </div>

        {/* Links */}
        <div>
          <div className="w-full  ">
            <div className="relative">
              {" "}
              <input
                type="text"
                className="w-full h-10 rounded-full border-black-100  border-2 focus:outline-none px-3 focus:shadow-md"
                placeholder="Search..."
              />{" "}
              <svg
                className="w-5 h-5 absolute right-3 top-3 text-gray-300"
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
            </div>
            <ul className="pl-2">
              <li className="flex justify-between mt-2 pt-2 bg-white  hover:shadow-lg rounded cursor-pointer transition">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full"
                >
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
                </button>
                <div className="flex flex-col ">
                  {" "}
                  <span className="text-gray-300">11:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between  bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full"
                >
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
                </button>
                <div className="flex flex-col ">
                  {" "}
                  <span className="text-gray-300">12:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between  bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full"
                >
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
                </button>
                <div className="flex flex-col ">
                  {" "}
                  <span className="text-gray-300">8:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between  bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full"
                >
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
                </button>
                <div className="flex flex-col ">
                  {" "}
                  <span className="text-gray-300">7:16</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between  bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full"
                >
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
                </button>
                <div className="flex flex-col ">
                  {" "}
                  <span className="text-gray-300">9:26</span>{" "}
                  <i className="fa fa-star text-green-400"></i>{" "}
                </div>
              </li>
              <li className="flex justify-between items-center bg-white mt-2 pt-2 hover:shadow-lg rounded cursor-pointer transition">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full"
                >
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
                      <span className="text-sm text-gray-400 truncate w-32 ml-0">
                        May be yes
                      </span>{" "}
                    </div>
                  </div>
                </button>
                <div className="flex flex-col ">
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
