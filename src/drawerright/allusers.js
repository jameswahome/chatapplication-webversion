import React, { useContext, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import UsersList from '../components/admin/users/allusers';
import AuthContext from '../context/auth-context';
import Spinner from '../components/spinner/spinner';

import { Button, Modal } from 'react-bootstrap';

const Contact = (props) => {
  const contextType = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isSetOpen, setisSetOpen] = useState(false);
  const [selectedUser, setselectedUser] = useState();
  const [selectedMember, setselectedMember] = useState();
  const [allData, setAllData] = useState([]);
  const roleElRef = React.createRef();
  const emailElRef = React.createRef();
  const usernameElRef = React.createRef();
  const nameElRef = React.createRef();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const openUpdateModal = () => {
    setisSetOpen(true);
  };

  const closeUpdateModal = () => {
    setisSetOpen(false);
  };

  const users = gql`
    query {
      allusers {
        _id
        username
        names
        email
        profileimage
        role {
          role
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(users);
  if (loading) return <Spinner />;
  if (error) return `Error! ${error} `;

  const Allusers = data.allusers;

  const updateUserRole = (usersDetails) => {
    openModal();

    setselectedUser(usersDetails);
  };
  const updateRole = () => {
    const role = roleElRef.current.value;
    const requestBody = {
      query: `
      mutation Updatedvariables($roles: String!){
        updaterole(role: $roles, username: "${selectedUser.username}") {
          user {
            username
          }
          role
        }
      }
      
        `,
      variables: {
        roles: role,
      },
    };

    fetch('https://server.themarketpalace.com/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then((resData) => {
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateUser = () => {
    const email = emailElRef.current.value;
    const username = usernameElRef.current.value;
    const names = nameElRef.current.value;
    const requestBody = {
      query: `
      mutation neusersDetails($email: String!, $username:  String!, $names: String!){
        updateusername(input:{email:$email, username:$username, names: $names, id: "${selectedMember._id}"}){
          username
          email
          names
        }
      }
      
        `,
      variables: {
        email: email,
        username: username,
        names: names,
      },
    };

    fetch('https://server.themarketpalace.com/api', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then((resData) => {
        setisSetOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateUsersDetails = (usersDetails) => {
    openUpdateModal();

    setselectedMember(usersDetails);
  };
  function handleSearch(event) {
    if (event !== undefined) {
      let value = event.target.value.toLowerCase();
      let result = [];
      result = Allusers.filter((data) => {
        return data.username.search(value) !== -1;
      });
      setAllData(result);
    }
  }
  const filteredData = () => {
    if (allData.length !== 0) {
      return allData;
    }
    return Allusers;
  };
  return (
    <React.Fragment>
      {contextType.role !== 'admin' ? (
        <p>Unauthorized</p>
      ) : (
        <div>
          <UsersList
            all={filteredData()}
            triggermodal={updateUserRole}
            triggerUpdate={updateUsersDetails}
            search={handleSearch}
          />
        </div>
      )}
      {isOpen && (
        <Modal show={isOpen} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div>
                <div className="col justify-content-around">
                  <label htmlFor="email">
                    <b>email</b>
                  </label>
                </div>
                <div className="col justify-content-around">
                  <input
                    defaultValue={selectedUser.email}
                    type="text"
                    id="email"
                    className="form-control"
                    name="email"
                    placeholder="email address"
                    aria-required="true"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col justify-content-around">
                  <label htmlFor="username1">
                    <b>username</b>
                  </label>
                </div>
                <div className="col justify-content-around">
                  <input
                    defaultValue={selectedUser.username}
                    type="text"
                    id="username1"
                    className="form-control"
                    name="username"
                    placeholder="username"
                    aria-required="true"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col justify-content-around">
                  <label htmlFor="user_role">
                    <b>Update role</b>
                  </label>
                </div>
                <div className="form-group">
                  <div className="col justify-content-around">
                    <select
                      className="form-control"
                      name="categories[]"
                      id="user_role"
                      defaultValue={selectedUser.role.role}
                      ref={roleElRef}
                    >
                      <option disabled selected>
                        Select Role
                      </option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Administrator</option>
                      <option value="member">Member</option>
                      <option value="banned">Banned</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={updateRole}>
              Submit
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}
      {isSetOpen && (
        <Modal show={isSetOpen} onHide={closeUpdateModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div>
                <div className="col justify-content-around">
                  <label htmlFor="email">
                    <b>email</b>
                  </label>
                </div>
                <div className="col justify-content-around">
                  <input
                    defaultValue={selectedMember.email}
                    type="text"
                    id="email"
                    className="form-control"
                    name="email"
                    placeholder="email address"
                    aria-required="true"
                    ref={emailElRef}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="col justify-content-around">
                  <label htmlFor="username1">
                    <b>username</b>
                  </label>
                </div>
                <div className="col justify-content-around">
                  <input
                    defaultValue={selectedMember.username}
                    type="text"
                    id="username1"
                    className="form-control"
                    name="username"
                    placeholder="username"
                    aria-required="true"
                    ref={usernameElRef}
                  />
                </div>
              </div>

              <div>
                <div className="form-group">
                  <div className="col justify-content-around">
                    <label htmlFor="name1">
                      <b>Name</b>
                    </label>
                  </div>
                  <div className="col justify-content-around">
                    <input
                      defaultValue={selectedMember.names}
                      type="text"
                      id="name1"
                      className="form-control"
                      name="name"
                      placeholder="name"
                      aria-required="true"
                      ref={nameElRef}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="col justify-content-around">
                  <label htmlFor="role">
                    <b>role</b>
                  </label>
                </div>
                <div className="col justify-content-around">
                  <input
                    defaultValue={selectedMember.role.role}
                    type="text"
                    id="role"
                    disabled
                    className="form-control"
                    name="email"
                    placeholder="email address"
                    aria-required="true"
                  />
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" onClick={updateUser}>
              Submit
            </Button>
            <Button onClick={openUpdateModal}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Contact;
