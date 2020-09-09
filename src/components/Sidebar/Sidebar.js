import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
  useMediaQuery,
} from "@material-ui/core";
import {
  AiOutlineUsergroupDelete,
  AiOutlineUser,
  AiOutlineEyeInvisible,
  AiOutlineEye,
  AiOutlineUserDelete,
  AiOutlineUserSwitch,
  AiOutlineSetting,
  AiOutlineDashboard,
} from "react-icons/ai";

import { toggleSidebar } from "../../store/actions/navActions";
import { IconContext } from "react-icons/lib";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
    width: 0,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
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
}));

export const ListItemLink = (props) => {
  const { icon, primary, to, pathname } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} selected={pathname === to}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const Sidebar = ({ nav, toggleSidebar }) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  let { pathname } = useLocation();

  return (
    <Drawer
      variant={mobile ? "temporary" : "permanent"}
      anchor="left"
      open={nav.isExpanded}
      onClose={toggleSidebar}
      className={
        !mobile
          ? clsx(classes.drawer, {
              [classes.drawerOpen]: nav.isExpanded,
              [classes.drawerClose]: !nav.isExpanded,
            })
          : null
      }
      classes={
        !mobile
          ? {
              paper: clsx({
                [classes.drawerOpen]: nav.isExpanded,
                [classes.drawerClose]: !nav.isExpanded,
              }),
            }
          : null
      }
    >
      <div className={classes.toolbar}></div>
      <div onClick={mobile ? toggleSidebar : undefined}>
        <IconContext.Provider value={{ size: 24 }}>
          <List>
            <ListItemLink
              to="/"
              primary="Overview"
              icon={<AiOutlineDashboard />}
              pathname={pathname}
            />
            <ListItemLink
              to="/followers"
              primary="Followers"
              icon={<AiOutlineUser />}
              pathname={pathname}
            />

            <ListItemLink
              to="/unfollowers"
              primary="Unfollowers"
              icon={<AiOutlineUsergroupDelete />}
              pathname={pathname}
            />
            <ListItemLink
              to="/notfollowing"
              primary="I don't follow back"
              icon={<AiOutlineUserDelete />}
              pathname={pathname}
            />
          </List>
          <Divider />
          <List>
            <ListItemLink
              to="/following"
              primary="Following"
              icon={<AiOutlineEye />}
              pathname={pathname}
            />
            <ListItemLink
              to="/followingback"
              primary="Following back"
              icon={<AiOutlineUserSwitch />}
              pathname={pathname}
            />
            <ListItemLink
              to="/notfollowers"
              primary="Not following back"
              icon={<AiOutlineEyeInvisible />}
              pathname={pathname}
            />
          </List>
          <Divider />
          <List>
            <ListItemLink
              to="/settings"
              primary="Settings"
              icon={<AiOutlineSetting />}
              pathname={pathname}
            />
          </List>
        </IconContext.Provider>
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  nav: state.nav,
});

export default compose(connect(mapStateToProps, { toggleSidebar }))(Sidebar);
