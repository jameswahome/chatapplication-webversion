import React, { useContext } from 'react';

import User from './meitem';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../../context/auth-context';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
    borderRadius: 20,
  },
}));
const UserList = (props) => {
  const meStyle = useStyles();
  const contextType = useContext(AuthContext);
  return (
    <User
      eventId={props.self._id}
      email={props.self.email}
      names={props.self.names}
      usernames={props.self.username}
      online={props.self.lastseen}
      meCard={meStyle}
      meLogin={contextType}
      pImageU={props.personalProf}
      fileUploadChange={props.fileOnchangeUpload}
    />
  );
};
export default UserList;
