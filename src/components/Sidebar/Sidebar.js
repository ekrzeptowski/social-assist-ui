import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";

import { toggleSidebar } from "../../store/actions/navActions";
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
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <Link to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
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
        <List>
          <ListItemLink to="/" primary="Overview" icon={<DashboardIcon />} />
          <ListItemLink
            to="/followers"
            primary="Followers"
            icon={<AddCircleIcon />}
          />

          <ListItemLink
            to="/unfollowers"
            primary="Unfollowers"
            icon={<DeleteIcon />}
          />
          <ListItemLink
            to="/notfollowing"
            primary="I don't follow back"
            icon={<DeleteIcon />}
          />
        </List>
        <Divider />
        <List>
          <ListItemLink
            to="/following"
            primary="Following"
            icon={<SettingsIcon />}
          />
          <ListItemLink
            to="/notfollowers"
            primary="Not following back"
            icon={<SettingsIcon />}
          />
        </List>
        <Divider />
        <List>
          <ListItemLink
            to="/settings"
            primary="Settings"
            icon={<SettingsIcon />}
          />
        </List>
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  nav: state.nav,
});

export default compose(connect(mapStateToProps, { toggleSidebar }))(Sidebar);
