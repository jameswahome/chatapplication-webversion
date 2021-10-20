import React, { useContext, useState } from "react";
import AuthContext from "../../context/auth-context";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import modalConfirmHandler from "../../requests/sendMessage";

const MessagesList = (props) => {
  const [text, setText] = useState("");
  const AllMessages = props.allmessagez;
  const contextType = useContext(AuthContext);
  const myConversations = AllMessages.slice().sort((a, b) => {
    const dateA = new Date(b.createdAt);
    const DateB = new Date(a.createdAt);

    return DateB - dateA;
  });
  const creatorProfile = myConversations[0].user.profileimage;

  let inputUsername;
  if (myConversations[0].user.username === contextType.username) {
    inputUsername = myConversations[0].creator.username;
  } else {
    inputUsername = myConversations[0].user.username;
  }

  const handleSendMessage = () => {
    modalConfirmHandler({ text, inputUsername });
    setText("");
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="h-screen bg-white">
        <div className="  h-screen ">
          <div className="w-full h-screen bg-white rounded shadow-2xl ">
            <nav className="w-full h-10 bg-blue rounded-tr rounded-tl flex justify-between items-center">
              <div className="flex justify-center items-center">
                {" "}
                <svg
                  className="w-4 h-4 ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => props.openSideBar(true)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>{" "}
                {creatorProfile === null ? (
                  <img
                    src="https://res.cloudinary.com/jaymojay/image/upload/v1634151683/24-248253_user-profile-default-image-png-clipart-png-download_qm0dl0.png"
                    className="rounded-full ml-4 w-8 h-8"
                    alt="img"
                  />
                ) : (
                  <img
                    src={creatorProfile}
                    className="rounded-full ml-4 w-8 h-8"
                    alt="img"
                  />
                )}
                {myConversations[0].creator.username ===
                contextType.username ? (
                  <span className="text-xs font-medium text-white ml-2">
                    {myConversations[0].user.username}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-white ml-2">
                    {myConversations[0].creator.username}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                {" "}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="white"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>{" "}
                <svg
                  className="w-5 h-5 ml-5"
                  fill="white"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>{" "}
                <svg
                  className="w-5 h-5 ml-4"
                  fill="white"
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
            </nav>
            <div className="overflow-auto px-1 py-1 h-5/6">
              {myConversations.map((conversation) => {
                return (
                  <li key={conversation._id} className="list-none">
                    {conversation.creator.username !== contextType.username ? (
                      <div className="flex items-center pr-10">
                        {creatorProfile === null ? (
                          <img
                            src="https://res.cloudinary.com/jaymojay/image/upload/v1634151683/24-248253_user-profile-default-image-png-clipart-png-download_qm0dl0.png"
                            className="rounded-full shadow-xl h-12 w-12"
                            alt="img"
                          />
                        ) : (
                          <img
                            src={creatorProfile}
                            className="rounded-full shadow-xl h-12 w-12"
                            alt="img"
                          />
                        )}
                        <span className="flex ml-1 h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end">
                          {conversation.body}{" "}
                          <span className="text-gray-400 pl-1 ">01:25am</span>
                        </span>{" "}
                      </div>
                    ) : (
                      <div className="flex justify-end pt-2 pl-10">
                        <span className="bg-green-900  h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end ">
                          {conversation.body}
                          <span className="text-gray-400 pl-1">02.30am</span>
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}

              <div className=" " id="chatmsg"></div>
            </div>
          </div>
          <div className="flex justify-between items-center absolute bottom-2 left-0 w-full pl-2 pr-4">
            <div className="relative flex rounded-full bg-blue w-full justify-center items-center">
              {/* attachment icon */}
              <svg
                className="w-8 h-8 mt-1 ml-1"
                fill="transparent"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
              <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                onEnter={() => handleSendMessage()}
                placeholder="Type a message"
              />
            </div>
            {text === "" ? (
              <div className="w-7 h-7 rounded-full bg-blue text-center items-center flex justify-center hover:bg-gray-900 hover:text-white">
                {" "}
                {/* mic icon*/}
                <svg
                  className="w-8 h-8 mt-1"
                  fill="transparent"
                  stroke="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>{" "}
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-blue-400 text-center items-center flex justify-center">
                {/* send button*/}
                <button
                  className="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-gray-900 hover:text-white"
                  onClick={() => handleSendMessage()}
                >
                  <svg
                    className="w-8 h-8"
                    fill="transparent"
                    stroke="black"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>{" "}
                </button>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessagesList;
