import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import Backdrop from '../components/Backdrop/backdrop';
import Messages from '../components/messages/messageslist';
import AuthContext from '../context/auth-context';
import Spinner from '../components/spinner/spinner';
import './../index.css';

export default function EventsPage(props) {
  const contextType = useContext(AuthContext);
  const [isOpen] = useState(false);
  const [selectedEvent] = useState(null);

  //it unmounts the component on load removing any previous subscriptions

  const allMessages = gql`
    query {
      messages {
        _id
        title
        body
        creator {
          username
          profileimage
          role {
            role
          }
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

  const mytopic = data.messages;

  return (
    <React.Fragment>
      {(isOpen || selectedEvent) && <Backdrop />}

      {contextType.role !== 'admin' ? (
        <p>Unauthorized</p>
      ) : (
        <div>
          <Messages allmessagez={mytopic} />
        </div>
      )}
    </React.Fragment>
  );
}
