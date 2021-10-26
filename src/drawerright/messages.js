import React, { useContext, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Backdrop from "../components/Backdrop/backdrop";
import Messages from "../components/messages/messageslist";
import AuthContext from "../context/auth-context";
import Spinner from "../components/spinner/spinner";
import "./../index.css";
import EmptyMessage from "../components/messages/EmpyMessage";

export default function EventsPage(props) {
  const userId = props.userId;

  const contextType = useContext(AuthContext);
  const [isOpen] = useState(false);
  const [selectedEvent] = useState(null);

  const allMessages = gql`
    query {
      singleUserMessageList(userId: "${userId}") {
        updatedAt
        createdAt
        user {
          username
          profileimage
          _id
        }
        receiver {
          username
          profileimage
          _id
        }
        messageslists {
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
        }
      }
    }
  `;

  const MessageSubscription = gql`
    subscription {
      newmessageList {
        user {
          username
          profileimage
          _id
        }
        receiver {
          username
          profileimage
          _id
        }
        messageslists {
          body
          user {
            username
            profileimage
          }
          creator {
            username
            profileimage
          }
        }
      }
    }
  `;

  const { loading, error, data, subscribeToMore } = useQuery(allMessages);
  if (loading) return <Spinner />;
  if (error) return <EmptyMessage setContacts={props.setContacts} />;

  const myConversation = data.singleUserMessageList;
  console.log(myConversation);
  const subscribeToNewTopics = () => {
    subscribeToMore({
      document: MessageSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newmessageList;

        return Object.assign({}, prev, {
          singleUserMessageList: {
            singleUserMessageList: [newFeedItem, prev.singleUserMessageList],
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
