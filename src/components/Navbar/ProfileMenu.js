import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography, Button, Box } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "gatsby";

const useStyles = makeStyles((theme) => ({
  popover: {
    // background: theme.custom.palette.profilePopColor,
    width: theme.spacing(40),
    borderRadius: theme.shape.borderRadius,
  },
  container: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "column",
    alignItems: "center",
  },
  actions: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    height: 128,
    width: 128,
  },
}));

const ProfileMenu = ({ anchorEl, onClose, user, onLogOut }) => {
  const classes = useStyles();

  return (
    <div>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: classes.popover,
        }}
      >
        <div className={classes.container}>
          <Avatar
            className={classes.avatar}
            alt={user.name}
            src={user.avatar.replace("_normal", "")}
          />
          <Box>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="caption" color="textSecondary">
              <Link
                href={`https://twitter.com/${user.username}`}
                target="_blank"
                rel="noreferrer"
              >
                @{user.username}
              </Link>
            </Typography>
          </Box>
          <div className={classes.actions}>
            <Button
              variant="contained"
              component={RouterLink}
              to="/settings"
              color="primary"
            >
              Settings
            </Button>
            <Button variant="contained" onClick={onLogOut}>
              Sign-out
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default ProfileMenu;
