import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Backdrop,
  makeStyles,
} from "@material-ui/core";

import { useLocation, Link } from "react-router-dom";
import MoreMenu from "./MoreMenu";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineUsergroupDelete,
  AiOutlineMore,
} from "react-icons/ai";
import { IconContext } from "react-icons/lib";

const useStyles = makeStyles(() => ({
  backdrop: {
    justifyContent: "flex-start",
    zIndex: 0,
  },
}));

const MobileNav = ({ className }) => {
  let location = useLocation();
  const classes = useStyles();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <IconContext.Provider value={{ size: 24 }}>
      <Backdrop
        className={classes.backdrop}
        open={isExpanded}
        onClick={() => setIsExpanded((cur) => !cur)}
      >
        <MoreMenu isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      </Backdrop>
      <BottomNavigation
        value={location.pathname}
        className={className}
        showLabels
      >
        <BottomNavigationAction
          label="Overview"
          component={Link}
          to="/"
          value="/"
          icon={<AiOutlineDashboard />}
        />
        <BottomNavigationAction
          label="Followers"
          to="/followers"
          component={Link}
          value="/followers"
          icon={<AiOutlineUser />}
        />
        <BottomNavigationAction
          label="Unfollowers"
          value="/unfollowers"
          component={Link}
          to="/unfollowers"
          icon={<AiOutlineUsergroupDelete />}
        />
        <BottomNavigationAction
          label="More"
          value="/more"
          onClick={() => setIsExpanded((cur) => !cur)}
          icon={<AiOutlineMore />}
        />
      </BottomNavigation>
    </IconContext.Provider>
  );
};

export default MobileNav;
