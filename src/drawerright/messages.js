import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Backdrop from "../components/Backdrop/backdrop";
import Messages from "../components/messages/messageslist";
import AuthContext from "../context/auth-context";
import Spinner from "../components/spinner/spinner";
import "./../index.css";

export default function EventsPage(props) {
  const contextType = useContext(AuthContext);
  const [isOpen] = useState(false);
  const [selectedEvent] = useState(null);

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

  const { loading, error, data } = useQuery(allMessages);
  if (loading) return <Spinner />;
  if (error) return `Error! ${error} `;

  const mytopic = data.usersMessages;

  return (
    <React.Fragment>
      {(isOpen || selectedEvent) && <Backdrop />}

      {contextType.token ? (
        <div className="">
          <Messages allmessagez={mytopic} openSideBar={props.bringSidebar} />
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </React.Fragment>
  );
}
