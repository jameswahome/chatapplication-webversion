import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const singleUser = ({ usernames, email, names, meCard, meLogin, pImageU, fileUploadChange }) => (
  <Card className={meCard.root}>
    <Box display="flex" justifyContent="center" alignItems="center" p={2}>
      {meLogin.token && pImageU !== null && meLogin.role !== 'banned' ? (
        <div>
          <div className="img-wrap img-upload">
            <img src={pImageU} alt="profile" className="mb-1" />
          </div>
          {meLogin.token && (
            <div className="editupload">
              <IconButton
                aria-label="Edit"
                style={{ textAlign: 'center' }}
                onClick={fileUploadChange}
              >
                <Edit />
              </IconButton>
            </div>
          )}
        </div>
      ) : meLogin.token && usernames !== undefined && meLogin.role !== 'banned' ? (
        <>
          <div>
            <h1>
              <div id="container" className="col-sm-3 me-3">
                <div id="name">{meLogin.token && usernames.substring(0, 1)} </div>
              </div>
              {meLogin.token && (
                <IconButton aria-label="Edit" onClick={fileUploadChange}>
                  <Edit />
                </IconButton>
              )}
            </h1>
          </div>
        </>
      ) : (
        meLogin.token &&
        meLogin.role !== 'banned' && (
          <>
            <div className="col-sm-3 me-3">
              <AccountCircleIcon />
            </div>
          </>
        )
      )}
    </Box>
    <CardHeader title={names} subheader={`@${usernames}`} style={{ textAlign: 'center' }} />

    <CardContent style={{ textAlign: 'center' }}>
      <Typography>email: {email}</Typography>
      <Typography> </Typography>
    </CardContent>
    <CardActions disableSpacing></CardActions>
  </Card>
);
export default singleUser;
