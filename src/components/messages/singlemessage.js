import React, { useContext } from 'react';

import AuthContext from '../../context/auth-context';
import EventItem from './singlemessageitem';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 345,
  },
}));
const SingleMessageList = (props) => {
  const singleStyle = useStyles();
  const contextType = useContext(AuthContext);
  const event = props.smessage;

  return <EventItem MessageTitle={event} userlog={contextType.username} SingleCard={singleStyle} />;
};
export default SingleMessageList;
