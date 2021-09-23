import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineX } from 'react-icons/hi';
import AuthContext from '../../../context/auth-context';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { convertFromRaw } from 'draft-js';
import moment from 'moment';

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

const SMCList = (props) => {
  const contextType = useContext(AuthContext);
  const events = props.allMessagesl;

  return (
    <div>
      <ul className="px-1">
        {events.map((comments, index) => {
          return (
            <li key={index} className="list-none">
              <div className="m-1">
                <div className=" w-full ">
                  <div className="border-2 rounded-lg border-blue-100 shadow-md p-4 flex flex-col justify-between leading-normal">
                    <div className="flex flex-row items-center">
                      <div className="profile">
                        <h1>
                          {comments.user.profileimage !== null &&
                          comments.user.username === contextType.username ? (
                            <Link to={`/personalprofile/${comments.user.username}`}>
                              <div className="col-sm-3 me-1">
                                <img
                                  src={comments.user.profileimage}
                                  alt="profile"
                                  className="mb-1"
                                />
                              </div>
                            </Link>
                          ) : comments.user.profileimage !== null ? (
                            <Link to={`/profile/${comments.user.username}`}>
                              <div className="col-sm-3 me-1">
                                <img
                                  src={comments.user.profileimage}
                                  alt="profile"
                                  className="mb-1"
                                />
                              </div>
                            </Link>
                          ) : comments.user.username !== undefined &&
                            comments.user.username === contextType.username ? (
                            <div>
                              <h1>
                                <Link to={`/personalprofile/${comments.user.username}`}>
                                  <div id="container" className="me-1">
                                    <div id="name">{comments.user.username.substring(0, 1)} </div>
                                  </div>
                                </Link>
                              </h1>
                            </div>
                          ) : comments.user.username !== undefined ? (
                            <div>
                              <h1>
                                <Link to={`/profile/${comments.user.username}`}>
                                  <div id="container" className="me-1">
                                    <div id="name">{comments.user.username.substring(0, 1)} </div>
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

                      <p className="flex-1 text-gray-900  text-md  ml-4">
                        {comments.user.username}
                      </p>
                      <div className="flex flex-row-reverse">
                        <p className="text-sm text-gray-600 flex items-center">
                          {moment.duration(moment().diff(comments.createdAt)).humanize() + ' ago'}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm py-1 px-3 ">
                      <p className="text-gray-900 leading-none flex ">{comments.user.role.role}</p>
                    </div>

                    <div className=" py-2">
                      <div
                        className="text-gray-700 text-base"
                        dangerouslySetInnerHTML={createMarkup(comments.body)}
                      ></div>
                      <div className="flex mt-4 space-x-6">
                        {contextType.role === 'admin' && (
                          <div>
                            <button
                              className="bg-white"
                              onClick={props.Deleting.bind(this, comments._id)}
                            >
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
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SMCList;
