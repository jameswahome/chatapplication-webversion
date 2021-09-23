import React, { useState, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import Spinner from "../components/spinner/spinner";
import AuthContext from "../context/auth-context";
import { Modal, Button } from "react-bootstrap";
import "./../index.css";

export default function Personalprofile(props) {
  const contextType = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    "https://res.cloudinary.com/jaymojay/image/upload/v1625326563/jidgpsk4h6ka9wsmobj7.jpg"
  );

  const [CError, setCError] = useState();

  const closeModal = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };
  const usersprofile = gql`
  query{
    oneuser(username: "${props.match.params.creatorId}"){
      _id
      username
      names
      email
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

  function FetchUsersProfile() {
    const { loading, error, data } = useQuery(usersprofile);
    if (loading) return <Spinner />;
    if (error) return `Error! ${error} `;

    return data.oneuser;
  }

  const user = FetchUsersProfile();

  const imageurl = user.profileimage;

  const uploadImage = (filename) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("profileImage", filename, filename.name);

    fetch("https://server.themarketpalace.com/upload", {
      method: "PUT",
      body: formData,
      headers: {},
      credentials: "include",
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then((resData) => {
        //check ifis login then get the token details and pass it into the contexttype
        const events = resData.image;

        const requestBody = {
          query: `
          mutation {
            updateuser(input: {username: "${props.match.params.creatorId}", profileimage:"${events}"}) {
              username
              description
              email
              names
              profileimage
              role{
                role
              }
            }
          }
            `,
        };

        // const token = this.context.token;
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
          .then((resData) => {
            //check ifis login then get the token details and pass it into the contexttype
            setIsLoading(false);
            window.location.reload();
          });
      })
      .catch((err) => {
        setCError(
          "invalid file. kindly ensure the selected image has an extention of png or jpeg"
        );
        console.log(err);
        setIsLoading(false);
      });
  };

  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
    uploadImage(file);
  };
  const handleSubmit = (e) => {
    closeModal();
  };

  return (
    <React.Fragment>
      {isOpen && (
        <Modal show={isOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="personalImage">
              <p>Click on the avatar to select an image</p>
              <form>
                <label
                  htmlFor="photo-upload"
                  className="custom-file-upload fas"
                >
                  <div className="img-wrap img-upload">
                    <img htmlFor="photo-upload" src={imagePreviewUrl} alt="" />
                  </div>
                  <input
                    id="photo-upload"
                    type="file"
                    onChange={(e) => photoUpload(e)}
                  />
                </label>
              </form>
            </div>
          </Modal.Body>

          <Modal.Footer style={{ textAlign: "center" }}>
            <Button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {contextType.token && contextType.role !== "banned" && (
            <div>
              {/* <User
                self={user}
                personalProf={imageurl}
                errorUser={CError}
                UploadIMG={uploadImage}
                fileOnchangeUpload={openModal}
              /> */}
            </div>
          )}
        </>
      )}
    </React.Fragment>
  );
}
