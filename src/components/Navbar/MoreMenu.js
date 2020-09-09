import React from "react";
import { makeStyles, List, useTheme, IconButton } from "@material-ui/core";
import { ListItemLink } from "../Sidebar/Sidebar";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {
  AiOutlineUserDelete,
  AiOutlineEye,
  AiOutlineUserSwitch,
  AiOutlineEyeInvisible,
  AiOutlineSetting,
} from "react-icons/ai";
import { IconContext } from "react-icons/lib";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "fixed",
    flexDirection: "column",
    alignItems: "center",
    background: theme.palette.background.paper,
    bottom: 56,
    width: "calc(100% - 20px)",
    margin: "0 10px",
    borderRadius: "10px 10px 0 0",
    boxShadow: theme.shadows[8],
    // height: 0,
    transition: "0.6s all cubic-bezier(0.22, 0.61, 0.36, 1)",
    transform: "translateY(110%)",
  },
  listContainer: {
    width: "100%",
  },
  expandedRoot: {
    transform: "translateY(0%)",
    // bottom: 56,
    // height: "auto",
  },
}));

const MoreMenu = ({ isExpanded, setIsExpanded }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <div
      className={`${classes.root} ${
        isExpanded ? classes.expandedRoot : undefined
      }`}
    >
      <IconContext.Provider value={{ size: 24 }}>
        <IconButton>
          <KeyboardArrowDownIcon />
        </IconButton>
        <List className={classes.listContainer}>
          <ListItemLink
            to="/notfollowing"
            primary="I don't follow back"
            icon={<AiOutlineUserDelete />}
          />
          <ListItemLink
            to="/following"
            primary="Following"
            icon={<AiOutlineEye />}
          />
          <ListItemLink
            to="/followingback"
            primary="Following back"
            icon={<AiOutlineUserSwitch />}
          />
          <ListItemLink
            to="/notfollowers"
            primary="Not following back"
            icon={<AiOutlineEyeInvisible />}
          />
          <ListItemLink
            to="/settings"
            primary="Settings"
            icon={<AiOutlineSetting />}
          />
        </List>
      </IconContext.Provider>
    </div>
  );
};

export default MoreMenu;
