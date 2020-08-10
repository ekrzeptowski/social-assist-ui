import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { logOutUser } from "../../store/actions/authActions";
import { toggleSidebar } from "../../store/actions/navActions";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Avatar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SyncIcon from "@material-ui/icons/Sync";
import { ProfileMenu } from "./ProfileMenu";
import SyncMenu from "./SyncMenu";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    marginRight: 8,
  },
  "@keyframes rotateIcon": {
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
  },
  rotateAnimation: {
    animation: "$rotateIcon 2s linear infinite",
  },
}));

const Navbar = ({ auth, nav, sync, toggleSidebar, logOutUser, history }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [syncAnchorEl, setSyncAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickSync = (event) => {
    setSyncAnchorEl(event.currentTarget);
  };

  const handleCloseSync = () => {
    setSyncAnchorEl(null);
  };

  const onLogOut = (event) => {
    event.preventDefault();
    logOutUser(history);
  };

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: nav.isExpanded,
      })}
    >
      <Toolbar>
        <IconButton color="inherit" onClick={toggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          Social Assisstant
        </Typography>
        {auth.isAuthenticated ? (
          <>
            <IconButton color="inherit" onClick={handleClickSync}>
              <SyncIcon className={sync.isLoading && classes.rotateAnimation} />
            </IconButton>
            <Button color="inherit" onClick={handleClick}>
              <Avatar
                className={classes.avatar}
                alt={auth.me.name}
                src={auth.me.avatar}
              />
              @{auth.me.username}
            </Button>
            <SyncMenu anchorEl={syncAnchorEl} onClose={handleCloseSync} />
            <ProfileMenu
              anchorEl={anchorEl}
              onClose={handleClose}
              onLogOut={onLogOut}
              user={auth.me}
            ></ProfileMenu>
            {/* <IconButton color="inherit"><AccountCircle/></IconButton> */}
          </>
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  nav: state.nav,
  sync: state.sync,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { logOutUser, toggleSidebar })
)(Navbar);
