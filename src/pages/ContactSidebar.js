import React, { useContext, useEffect, useRef } from "react";
import { gql, useQuery } from "@apollo/client";
import AuthContext from "../context/auth-context";
import Spinner from "../components/spinner/spinner";

function ContactList({
  sidebarOpen,
  setSidebarOpen,

  setContacts,
}) {
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

  const users = gql`
    query {
      allusers {
        _id
        username
        phonenumber
        email
        profileimage
        updatedAt
      }
    }
  `;

  const usersprofile = gql`
  query{
    oneuser(username: "${contextType.username}"){
      _id
      profileimage
    }
  }
`;

  function FetchUsersProfile() {
    const { loading, error, data } = useQuery(usersprofile);
    if (loading) return <Spinner />;
    if (error) return `Error! ${error} `;

    return data.oneuser;
  }

  const user = FetchUsersProfile();

  const { loading, error, data } = useQuery(users);
  if (loading) return <Spinner />;
  if (error) return `Error! ${error} `;

  const Allusers = data.allusers;
  const allContactList = Allusers.reduce(function (result, element) {
    if (element.username !== contextType.username) {
      result.push(element);
    }
    return result;
  }, []);

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
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-full flex-shrink-0 bg-blue transition-transform duration-200 ease-in-out pt-4 rounded-md ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className=" ">
          {/* Sidebar header */}
          <div className="flex justify-between mb-10 pr-3 sm:px-2 ">
            {user.profileimage === null ? (
              <img
                src="https://res.cloudinary.com/jaymojay/image/upload/v1634151683/24-248253_user-profile-default-image-png-clipart-png-download_qm0dl0.png"
                className="rounded-full h-8 w-8"
                alt="img"
              />
            ) : (
              <img
                src={user.profileimage}
                className="rounded-full h-8 w-8"
                alt="img"
              />
            )}

            <div className="text-white mr-28">Chat Application</div>
          </div>
          <div className="flex space-x-3 pl-4 pb-3">
            {/* contact list */}
            <button
              className="items-center justify-center "
              onClick={() => setContacts(false)}
            >
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div className=" font-bold "> New chat</div>
          </div>
        </div>

        {/* contacts  */}
        <div className=" h-screen bg-white rounded-md overflow-auto">
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
              {allContactList.map((allContacts) => {
                return (
                  <li
                    key={allContacts._id}
                    className="flex justify-between mt-2 pt-2 bg-white  hover:shadow-lg rounded cursor-pointer transition"
                  >
                    <button
                      onClick={() => setSidebarOpen(false)}
                      className="w-full"
                    >
                      <div className="flex ">
                        {" "}
                        {allContacts.profileimage === null ? (
                          <img
                            src="https://res.cloudinary.com/jaymojay/image/upload/v1634151683/24-248253_user-profile-default-image-png-clipart-png-download_qm0dl0.png"
                            className="rounded-full h-8 w-8"
                            alt="img"
                          />
                        ) : (
                          <img
                            src={allContacts.profileimage}
                            className="rounded-full h-8 w-8"
                            alt="img"
                          />
                        )}
                        <div className="flex flex-col ml-2">
                          {" "}
                          <span className="font-medium text-black">
                            {allContacts.username}
                          </span>{" "}
                          <span className="text-sm text-gray-400 truncate w-32">
                            Hey, Im using Chat Application
                          </span>{" "}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactList;
