import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Avatar, Typography, Button } from "@material-ui/core";
import { Popover } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  popover: {
    // background: theme.custom.palette.profilePopColor,
    width: theme.spacing(40),
    borderRadius: theme.shape.borderRadius
  },
  container: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center"
  },
  actions: {
      '& > *': {
          margin: theme.spacing(1)
      }
  }
}));

export const ProfileMenu = ({ anchorEl, onClose, user, onLogOut }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
        classes={{
          paper: classes.popover
        }}
      >
        <div className={classes.container}>
          <Avatar
            className={classes.avatar}
            alt={user.name}
            src={user.avatar}
          />
          <Typography variant="h5">{user.name}</Typography>
          <div className={classes.actions}>
              <Button variant="contained" color="primary">Settings</Button>
              <Button variant="contained" onClick={onLogOut}>Sign-out</Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};
