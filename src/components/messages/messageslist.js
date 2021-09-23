import React, { useContext } from "react";
import AuthContext from "../../context/auth-context";
import moment from "moment";
import { Link } from "react-router-dom";
import { HiOutlineX } from "react-icons/hi";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import { convertFromRaw } from "draft-js";

const createMarkup = (html) => {
  try {
    const converted = convertToHTML({
      entityToHTML: (entity, originalText) => {
        if (entity.type === "LINK") {
          return <a href={entity.data.url}>{originalText}</a>;
        }
        if (entity.type === "IMAGE" || entity.type === "EMBEDDED_LINK") {
          return <i>image</i>;
        }
        return originalText;
      },
    });

    return {
      __html: DOMPurify.sanitize(converted(convertFromRaw(JSON.parse(html)))),
    };
  } catch (err) {
    return { __html: html };
  }
};
const MessagesList = (props) => {
  const AllMessages = props.allmessagez;
  const contextType = useContext(AuthContext);
  const sortedMessages = AllMessages.slice().sort((a, b) => {
    const dateA = new Date(b.updatedAt);
    const DateB = new Date(a.updatedAt);

    return dateA - DateB;
  });
  const mytopic = sortedMessages;

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="h-screen bg-white">
        <div className="flex justify-center  h-screen ">
          <div className="w-full h-4/5 bg-white rounded shadow-2xl">
            <nav className="w-full h-10 bg-blue rounded-tr rounded-tl flex justify-between items-center">
              <div className="flex justify-center items-center">
                {" "}
                <svg
                  className="w-4 h-4 ml-4"
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
                </svg>{" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full ml-4 w-8 h-8"
                  alt="img"
                />{" "}
                <span className="text-xs font-medium text-white ml-2">
                  Alex cairo
                </span>{" "}
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
            <div className="overflow-auto px-1 py-1 h-full">
              <div className="flex items-center pr-10">
                {" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full shadow-xl h-12 w-12"
                  alt="img"
                />{" "}
                <span className="flex ml-1 h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end">
                  Hi Dr.Hendrikson, I haven't been feeling well for past few
                  days. <span className="text-gray-400 pl-1 ">01:25am</span>
                </span>{" "}
              </div>
              <div className="flex justify-end pt-2 pl-10">
                {" "}
                <span className="bg-green-900  h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end ">
                  Lets jump on a video call.{" "}
                  <span className="text-gray-400 pl-1">02.30am</span>
                </span>{" "}
              </div>
              <div className="flex justify-center">
                {" "}
                <span className="text-gray-500  text-xs pt-4">
                  Call started at 02:33 am
                </span>{" "}
              </div>
              <div className="flex justify-center">
                {" "}
                <span className="text-gray-500 text-xs">
                  Call ended at 02:33 am
                </span>{" "}
              </div>
              <div className="flex items-center pr-10 mt-1">
                {" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full shadow-xl h-12 w-12"
                  alt="img"
                />{" "}
                <span className="flex ml-1 h-auto bg-gray-900 text-gray-200 text-xs p-1 font-normal rounded-sm px-1 items-end">
                  How often should i take the medicine?{" "}
                  <span className="text-gray-400 pl-1">01:25am</span>
                </span>{" "}
              </div>
              <div className="flex justify-end pt-2 pl-10">
                {" "}
                <span className="bg-green-900 h-auto text-gray-200 text-xs font-normal p-1 rounded-sm px-1 items-end flex justify-end ">
                  Twice a day, at breakfast and before bed{" "}
                  <span className="text-gray-400 pl-1 text-xs">02.30am</span>
                </span>{" "}
              </div>
              <div className="flex items-center pr-10 pt-2">
                {" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full shadow-xl h-12 w-12"
                  alt="img"
                />
                <span className="flex ml-1 h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end">
                  Thanks a lot doc
                  <span className="text-gray-400 pl-1">01:25am</span>
                </span>{" "}
              </div>
              <div className="flex justify-end pt-2 pl-10">
                {" "}
                <span className="bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end ">
                  Thats my duty, mention not{" "}
                  <span className="text-gray-400 pl-1">02.30am</span>
                </span>{" "}
              </div>
              <div className="flex items-center pr-10 pt-2">
                {" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full shadow-xl h-12 w-12"
                  alt="img"
                />{" "}
                <span className="flex ml-1 h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end">
                  sorry to bother again but can i ask you one more favour?
                  <span className="text-gray-400 pl-1">01:25am</span>
                </span>{" "}
              </div>
              <div className="flex justify-end pt-2 pl-10">
                {" "}
                <span className="bg-green-900 h-auto text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end flex justify-end ">
                  yeah sure, go ahead?
                  <span className="text-gray-400 pl-1">02.30am</span>
                </span>{" "}
              </div>
              <div className="flex items-center pr-10 pt-2">
                {" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full shadow-xl h-12 w-12"
                  alt="img"
                />{" "}
                <span className="flex ml-1 h-auto bg-gray-900 text-gray-200 text-xs font-normal rounded-sm px-1 p-1 items-end">
                  I really had a scary feeling about this, can please advice
                  some tricks to overcome my anxiety?
                  <span className="text-gray-400 pl-1">01:25am</span>
                </span>{" "}
              </div>
              <div className=" " id="chatmsg">
                {" "}
              </div>
            </div>
            <div className="flex justify-between items-center  ">
              <div className="relative flex rounded-full bg-blue">
                {" "}
                <svg
                  className="w-6 h-6 mt-2"
                  fill="white"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <input
                  type="text"
                  className=" pl-2 pr-1 py-2 focus:outline-none h-auto overflow-auto  bg-blue placeholder-gray-100  text-white"
                  placeholder="Type a message..."
                />{" "}
                <svg
                  className="w-6 h-6 mt-2 "
                  fill="white"
                  stroke="currentColor"
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
                <svg
                  className="w-6 h-6 mt-2"
                  fill="white"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="w-7 h-7 rounded-full bg-blue text-center items-center flex justify-center hover:bg-gray-900 hover:text-white">
                {" "}
                <svg
                  className="w-6 h-6 mt-2"
                  fill="white"
                  stroke="currentColor"
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
              <div className="w-7 h-7 rounded-full bg-blue text-center items-center flex justify-center">
                {" "}
                <button
                  className="w-7 h-7 rounded-full text-center items-center flex justify-center focus:outline-none hover:bg-gray-900 hover:text-white"
                  onClick={() => {}}
                >
                  <svg
                    className="w-6 h-6"
                    fill="white"
                    stroke="currentColor"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessagesList;
