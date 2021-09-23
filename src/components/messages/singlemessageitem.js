import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineX } from 'react-icons/hi';
import moment from 'moment';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { convertFromRaw } from 'draft-js';

const createMarkup = (html) => {
  try {
    const converted = convertToHTML({
      entityToHTML: (entity, originalText) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.url}>{originalText}</a>;
        }
        if (entity.type === 'IMAGE' || entity.type === 'EMBEDDED_LINK') {
          return `<img src=${entity.data.src} />`;
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
const SingleMessageItem = ({ MessageTitle, userlog, SingleCard }) => (
  <div>
    <div className="m-1">
      <div className="text-xl ml-2 mb-3 mt-2 font-bold">{MessageTitle.title}</div>
      <div className="text-sm mt-2 ml-2">
        <p className="text-gray-900 leading-none flex ">
          <svg
            className="w-4 h-4"
            fill="#9b7e64"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          Messages
        </p>
      </div>
      <div className=" w-full overflow-auto">
        <div className="border-2 rounded-lg border-blue-100 shadow-md p-4 flex flex-col justify-between leading-normal">
          <div className="flex flex-row items-center">
            <div className="profile">
              <h1>
                {MessageTitle.creator.profileimage !== null &&
                MessageTitle.creator.username === userlog ? (
                  <Link to={`/personalprofile/${MessageTitle.creator.username}`}>
                    <div className="col-sm-3 me-1">
                      <img src={MessageTitle.creator.profileimage} alt="profile" className="mb-1" />
                    </div>
                  </Link>
                ) : MessageTitle.creator.profileimage !== null ? (
                  <Link to={`/profile/${MessageTitle.creator.username}`}>
                    <div className="col-sm-3 me-1">
                      <img src={MessageTitle.creator.profileimage} alt="profile" className="mb-1" />
                    </div>
                  </Link>
                ) : MessageTitle.creator.username !== undefined &&
                  MessageTitle.creator.username === userlog ? (
                  <div>
                    <h1>
                      <Link to={`/personalprofile/${MessageTitle.creator.username}`}>
                        <div id="container" className="me-1">
                          <div id="name">{MessageTitle.creator.username.substring(0, 1)} </div>
                        </div>
                      </Link>
                    </h1>
                  </div>
                ) : MessageTitle.creator.username !== undefined ? (
                  <div>
                    <h1>
                      <Link to={`/profile/${MessageTitle.creator.username}`}>
                        <div id="container" className="me-1">
                          <div id="name">{MessageTitle.creator.username.substring(0, 1)} </div>
                        </div>
                      </Link>
                    </h1>
                  </div>
                ) : (
                  <div className="me-1">
                    <HiOutlineX />
                  </div>
                )}
              </h1>
            </div>

            <p className="flex-1 text-gray-900 font-bold text-md ml-2">
              {MessageTitle.creator.username}
            </p>
            <div className="flex flex-row-reverse">
              <p className="text-sm text-gray-600 flex items-center">
                {moment.duration(moment().diff(MessageTitle.updatedAt)).humanize() + ' ago'}
              </p>
            </div>
          </div>
          <div className="text-sm py-2 px-2 ">
            <p className="text-gray-900 leading-none flex ">{MessageTitle.creator.role.role}</p>
          </div>

          <div className="px-1 py-2">
            <div
              className="text-gray-700 text-base"
              dangerouslySetInnerHTML={createMarkup(MessageTitle.body)}
            ></div>
            <div className="flex space-x-6 mt-8">
              {/* {admin === 'admin' && (
                <div>
                  <button className="bg-white" onClick={deleteT}>
                    <svg
                      className="w-6 h-6"
                      fill="black"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>{' '}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default SingleMessageItem;
