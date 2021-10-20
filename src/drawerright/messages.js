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
        user {
          username
          profileimage
        }
        creator {
          username
          profileimage
        }
        createdAt
        updatedAt
      }
    }
  `;

  const MessageSubscription = gql`
    subscription {
      newmessages {
        _id
        body
        creator {
          username
          profileimage
        }
        createdAt
        updatedAt
        user {
          username
          profileimage
        }
      }
    }
  `;

  const { loading, error, data, subscribeToMore } = useQuery(allMessages);
  if (loading) return <Spinner />;
  if (error) return `Error! ${error} `;

  const myConversation = data.usersMessages;

  const subscribeToNewTopics = () => {
    subscribeToMore({
      document: MessageSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newmessages;

        return Object.assign({}, prev, {
          usersMessages: {
            usersMessages: [newFeedItem, prev.usersMessages],
          },
        });
      },
    });
  };
  subscribeToNewTopics();
  return (
    <React.Fragment>
      {(isOpen || selectedEvent) && <Backdrop />}

      {contextType.token ? (
        <div className="">
          <Messages
            allmessagez={myConversation}
            openSideBar={props.bringSidebar}
          />
        </div>
      ) : (
        <p>Unauthorized</p>
      )}
    </React.Fragment>
  );
}
