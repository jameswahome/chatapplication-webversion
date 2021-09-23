import React from 'react';
import { gql, useQuery } from '@apollo/client';
import Spinner from '../../components/spinner/spinner';

const DashUsers = (props) => {
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
  function GetAllUsers() {
    const { loading, error, data } = useQuery(users);
    if (loading) return <Spinner />;
    if (error) return `Error! ${error} `;
    console.log(data);
    return data.allusers;
  }
  const generAllUsers = GetAllUsers();
  console.log(generAllUsers);
  return generAllUsers;
};

export default DashUsers;
