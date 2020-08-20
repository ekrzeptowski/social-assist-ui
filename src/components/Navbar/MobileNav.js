import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Backdrop,
  makeStyles,
} from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import MenuIcon from "@material-ui/icons/Menu";
import { useLocation, Link } from "react-router-dom";
import MoreMenu from "./MoreMenu";

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
    <>
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
          icon={<DashboardIcon />}
        />
        <BottomNavigationAction
          label="Followers"
          to="/followers"
          component={Link}
          value="/followers"
          icon={<DashboardIcon />}
        />
        <BottomNavigationAction
          label="Unfollowers"
          value="/unfollowers"
          component={Link}
          to="/unfollowers"
          icon={<DashboardIcon />}
        />
        <BottomNavigationAction
          label="More"
          value="/more"
          onClick={() => setIsExpanded((cur) => !cur)}
          // component={Link}
          // to="/more"
          icon={<MenuIcon />}
        />
      </BottomNavigation>
    </>
  );
};

export default MobileNav;
