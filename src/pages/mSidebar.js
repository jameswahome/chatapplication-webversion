import React, { useContext, useEffect, useRef, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import AuthContext from "../context/auth-context";
import Spinner from "../components/spinner/spinner";

function Sidebar({ sidebarOpen, setSidebarOpen, setContacts }) {
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const contextType = useContext(AuthContext);
  const [dropItDown, setDropItDown] = useState(false);

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

  const allMessages = gql`
    query {
      usersMessages {
        _id
        body
        creator {
          username
          profileimage
        }
        createdAt
        updatedAt
        messageslist {
          body
        }
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

  const { loading, error, data } = useQuery(allMessages);
  if (loading) return <Spinner />;
  if (error) return `Error! ${error} `;

  const myMessages = data.usersMessages;

  const sortedMessages = myMessages.slice().sort((a, b) => {
    const dateA = new Date(b.updatedAt);
    const DateB = new Date(a.updatedAt);

    return dateA - DateB;
  });

  const contactListLength = sortedMessages.length;

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
            <div className="text-white">Chat Application</div>
            <div className="flex space-x-3">
              {/* contact list */}
              <button
                className="items-center justify-center "
                onClick={() => setContacts(true)}
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
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </button>

              {/* settings */}
              <button
                className="items-center justify-center "
                onClick={() => setDropItDown(true)}
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {dropItDown && (
          <div className="absolute right-7 w-32 py-2 top-16 bg-white border rounded shadow-xl">
            <button
              className="transition-colors duration-200 block px-4  text-normal text-gray-900 rounded hover:bg-blue hover:text-white no-underline"
              onClick={() => setDropItDown(false)}
            >
              {" "}
              Settings
            </button>
            <div className="">
              <hr></hr>
            </div>
            <button
              className="transition-colors duration-200 block px-4  text-normal text-gray-900 rounded hover:bg-blue hover:text-white no-underline"
              onClick={() => setDropItDown(false)}
            >
              Logout
            </button>
          </div>
        )}

        {/* conversations */}
        <div className=" h-screen bg-white rounded-md overflow-auto">
          <div className="w-full  ">
            <div className="">
              {" "}
              <input
                type="text"
                className="w-full h-10 rounded-full border-black-100  border-2 focus:outline-none px-3 focus:shadow-md"
                placeholder="Search..."
              />{" "}
              <svg
                className="w-5 h-5 absolute right-2 top-28 text-gray-300 "
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
              {contactListLength.length !== 0 ? (
                <>
                  {sortedMessages.map((customer) => {
                    const lastMessage = customer.messageslist.length - 1;
                    return (
                      <li
                        key={customer._id}
                        className="flex justify-between mt-2 pt-2 bg-white  hover:shadow-lg rounded cursor-pointer transition"
                      >
                        <button
                          onClick={() => setSidebarOpen(false)}
                          className="w-full"
                        >
                          <div className="flex ">
                            {" "}
                            {customer.creator.profileimage === null ? (
                              <img
                                src="https://res.cloudinary.com/jaymojay/image/upload/v1634151683/24-248253_user-profile-default-image-png-clipart-png-download_qm0dl0.png"
                                className="rounded-full h-8 w-8"
                                alt="img"
                              />
                            ) : (
                              <img
                                src={customer.creator.profileimage}
                                className="rounded-full h-8 w-8"
                                alt="img"
                              />
                            )}
                            <div className="flex flex-col ml-2">
                              {" "}
                              <span className="font-medium text-black -ml-16">
                                {customer.creator.username}
                              </span>{" "}
                              {customer.messageslist[lastMessage] ===
                              undefined ? (
                                <span className="text-sm text-gray-400 truncate w-32">
                                  {customer.body}
                                </span>
                              ) : (
                                <span className="text-sm text-gray-400 truncate w-32">
                                  {customer.messageslist[lastMessage].body}
                                </span>
                              )}
                            </div>
                          </div>
                        </button>
                        <div className="flex flex-col ">
                          {" "}
                          <span className="text-gray-300">11:26</span>{" "}
                          <i className="fa fa-star text-green-400"></i>{" "}
                        </div>
                      </li>
                    );
                  })}{" "}
                </>
              ) : (
                <div className="justify-center items-center absolute bottom-1/2 left-20">
                  <button onClick={() => setContacts(true)}>
                    <i className="font-serif">start a new conversation</i>
                  </button>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
