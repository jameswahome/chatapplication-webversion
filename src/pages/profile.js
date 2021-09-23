import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../components/spinner/spinner";
import "./../index.css";
import moment from "moment";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";

export default function EventsPage(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const usersprofile = gql`
  query{
    oneuser(username: "${props.match.params.creatorId}"){
      _id
      username
      names
      profileimage
      lastseen
      createdTopics{
        title
        }
        role{
          role
        }   
    createdAt
    }
  }
`;
  const messageElRef = React.createRef();
  const messageTitleElRef = React.createRef();

  const { loading, error, data } = useQuery(usersprofile);
  if (loading) return <Spinner />;
  if (error) return `Error! ${error} `;

  const user = data.oneuser;

  const imageurl = user.profileimage;

  const modalConfirmHandler = () => {
    const messageTitle = messageTitleElRef.current.value;
    const message = messageElRef.current.value;
    const username = user.username;
    //check if they're  fields which are null
    if (messageTitle.trim().length === 0 || message.trim().length === 0) {
      throw new Error("all fields are required");
    }
    setIsOpen(false);

    //post to the database
    const requestBody = {
      query: `
          mutation CreateEvent($title: String!, $desc: String!, $username: String! ) {
            CreateMessage(title: $title, body: $desc, user: $username){
              _id
              title
              body
            }
          }

        `,
      variables: {
        title: messageTitle,
        desc: message,
        username: username,
      },
    };

    fetch("https://server.themarketpalace.com/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        //  Authorization: 'Bearer ' + token,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        history.push(`/sm/${resData.data.CreateMessage._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      {isOpen && (
        <Modal show={isOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Start Message</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="modal-content animate">
              <div className="form-group">
                <div className="col justify-content-center">
                  <p>
                    <label htmlFor="messageusername">
                      <b>Username</b>
                    </label>
                  </p>
                </div>
                <div className="col justify-content-around">
                  <input
                    type="text"
                    id="messagetitle"
                    className="form-control"
                    name="message"
                    placeholder="Message Title"
                    aria-required="true"
                    value={user.username}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group mb-3">
                <div className="col justify-content-center">
                  <p>
                    <label htmlFor="messagetitle">
                      <b>Message Title</b>
                    </label>
                  </p>
                </div>
                <div className="col justify-content-around">
                  <input
                    type="text"
                    id="messagetitle"
                    className="form-control"
                    name="message"
                    placeholder="Message Title"
                    aria-required="true"
                    ref={messageTitleElRef}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col justify-content-around">
                  <textarea
                    type="text"
                    rows="8"
                    id="message"
                    className="form-control"
                    name="message"
                    placeholder="Enter Message"
                    aria-required="true"
                    ref={messageElRef}
                  />
                  <br />
                </div>
              </div>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" onClick={modalConfirmHandler}>
              Send Message
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}

      <div className="w-full ">
        <div className="container mx-auto px-6 flex items-start justify-center">
          <div aria-label="group of cards" className="w-full">
            <div className="flex flex-col lg:flex-row mx-auto bg-white dark:bg-gray-800 shadow rounded">
              <div className="w-full lg:w-1/2 px-12 flex flex-col items-center py-10">
                <div className="w-24 h-24 mb-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  {imageurl !== null ? (
                    <img
                      className="w-full h-full overflow-hidden object-cover rounded-full"
                      src={imageurl}
                      alt="avatar"
                    />
                  ) : user.username !== undefined ? (
                    <div className="w-full h-full object-cover rounded-full  bg-blue">
                      <div className="w-full px-4 ml-0.5  py-3 items-center justify-center text-5xl leading-10 text-white">
                        {user.username.substring(0, 1)}{" "}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <AccountCircleIcon />
                    </div>
                  )}
                </div>

                <h2 className=" text-xl tracking-normal font-medium mb-1">
                  {user.names}
                </h2>

                <span className="cursor-pointer mr-1 text-gray-600 dark:text-gray-100">
                  @{user.username}
                </span>

                <span className="cursor-pointer mr-1 text-gray-400 dark:text-gray-100">
                  {user.role.role}
                </span>

                <p className="text-gray-600 dark:text-gray-100 text-sm tracking-normal font-normal mb-8 mt-3 text-center w-10/12">
                  {/* Bio*/}
                </p>
              </div>
              <div className="w-full lg:w-2/3 px-12 align-text-bottom  lg:border-t-0 lg:border-b-0  justify-center flex flex-col  items-center py-1">
                <div className="flex items-start">
                  <div className="">
                    <p className=" dark:text-gray-100 text-gray-500 text-sm leading-5 text-center">
                      Joined
                    </p>
                    <div className="text-gray-600 dark:text-gray-100 text-sm leading-6 mb-2 text-center">
                      {moment
                        .duration(moment().diff(user.createdAt))
                        .humanize() + " ago"}
                    </div>
                  </div>
                  <div className="mx-6 lg:mx-3 xl:mx-6 px-8 lg:px-4 xl:px-8 ">
                    <p className=" dark:text-gray-100 text-gray-500 text-sm leading-5 text-center">
                      last seen
                    </p>
                    <div className="text-gray-600 dark:text-gray-100 text-sm leading-6 mb-2 text-center">
                      {moment
                        .duration(moment().diff(user.lastseen))
                        .humanize() + " ago"}
                    </div>
                  </div>
                  <div className="">
                    <p className=" dark:text-gray-100 text-gray-500 text-sm leading-5 text-center">
                      Created Topics
                    </p>
                    <h2 className="text-gray-600 dark:text-gray-100 text-sm leading-6 mb-2 text-center">
                      {user.createdTopics.length}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/4 flex justify-center items-center px-12 py-8">
                <button
                  className="w-24 rounded-lg h-8 hover:bg-gray-500 bg-gray-400 hover:text-white "
                  onClick={openModal}
                >
                  <div className="flex flex-row space-x-2 ml-1 mr-1">
                    <div className="mt-1 items-center ">
                      <svg
                        className="w-4 h-4 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>message</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
