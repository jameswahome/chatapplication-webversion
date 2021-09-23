import React, { useContext, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { gql, useQuery, useMutation } from "@apollo/client";
import { BsExclamationTriangle } from "react-icons/bs";
import AuthContext from "../context/auth-context";
import Spinner from "../components/spinner/spinner";
import "./../index.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function EventsPage(props) {
  const topicId = props.match.params.messageId;
  const [CError, setCError] = useState();
  const [editorState, seteditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  const contextType = useContext(AuthContext);
  const handleEditorChange = (state) => {
    seteditorState(state);
    convertContentToRaw();
  };

  const convertContentToRaw = () => {
    let currentContentAsRaw = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    setConvertedContent(currentContentAsRaw);
  };

  const AddComment = gql`
    mutation CreateEvent($comment: String!) {
      SendMessage(_id: "${topicId}", body: $comment) {
        body
        user {
          username
          profileimage
          role{
            role
          }
        }
      }
    }
  `;

  function AddComments() {
    const [addTodo] = useMutation(AddComment);

    const messagehandler = (e) => {
      e.preventDefault();
      if (convertedContent === null) {
        setCError("you can not send a blank text");
        return;
      }
      addTodo({ variables: { comment: convertedContent } });
      seteditorState(() => EditorState.createEmpty());
    };

    return (
      <div>
        <form>
          {CError !== undefined && (
            <div style={{ color: "red" }}>
              <BsExclamationTriangle />
              {CError}
            </div>
          )}
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorChange}
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: {
                uploadEnabled: true,
                allignmentEnabled: true,
                uploadCallback: uploadImageCallBack,
                previewImage: true,
                alt: { present: false, mandatory: false },
                inputAccept:
                  "image/gif,image/jpeg,image/jpg,image/png,image/svg,image/hevc,image/heif",
              },
            }}
          />
          <br />
          <Button type="submit" onClick={messagehandler}>
            {" "}
            send message
          </Button>
        </form>
      </div>
    );
  }

  const CommentsSubscription = gql`
    subscription {
      newmessageList(Messages: "${topicId}") {
        _id
        body
        user {
          username
          profileimage

        }
      }
    }
  `;

  const allmessagelist = gql`
    query {
      messageList(_id: "${topicId}") {
        _id
        body
        createdAt
        user {
          username
          profileimage
          role{
            role
          }
        }
      }
    }
  `;

  const allTopics = gql`
    query {
        singlemessage(_id: "${topicId}") {
        _id
        body
        title
        createdAt
        creator {
          username
          profileimage
          role{
            role
          }
        }
      }
    } 
  `;

  function FetchAllTopics() {
    const { loading, error, data } = useQuery(allTopics);
    if (loading) return <Spinner />;
    if (error) return `Error! ${error} `;

    return data.singlemessage;
  }

  const mytopic = FetchAllTopics();

  const usertopic = () => {
    if (mytopic.creator !== undefined) {
      const username = mytopic.creator.username;
      return username;
    }
  };

  const { loading, error, data, subscribeToMore } = useQuery(allmessagelist);
  if (loading) return <Spinner />;
  if (error) return `Error! ${error} `;

  const allcomments = data.messageList;

  const subscribeToNewComments = () => {
    subscribeToMore({
      document: CommentsSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newmessageList;

        return Object.assign({}, prev, {
          messageList: {
            messageList: [newFeedItem, prev.messageList],
          },
        });
      },
    });
  };
  subscribeToNewComments();

  function uploadImageCallBack(file) {
    const testimg = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", "https://server.themarketpalace.com/uploadimages");
      xhr.withCredentials = true;
      const data = new FormData();
      data.append("images", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        const imageurl = response.images.map((a) => a.secure_url)[0];
        resolve({ data: { link: imageurl } });
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        console.log(error);
        reject(error);
      });
    });
    return testimg;
  }
  const deleteMessageList = (messageId) => {
    const requestBody = {
      query: `
      mutation{
        DeleteSMessage(_id:"${messageId}"){
          _id
          body
        }
      }
        `,
    };

    fetch("https://server.themarketpalace.com/api", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
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
      .then((resData) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div>
        {/* {usertopic() && <SingleMessage smessage={mytopic} creatorusername={usertopic()} />} */}
      </div>

      <div>
        {/* <MessageLists allMessagesl={allcomments} Deleting={deleteMessageList} /> */}
      </div>
      {contextType.token && (
        <Container>
          <div>
            <AddComments />
          </div>
        </Container>
      )}
    </React.Fragment>
  );
}
