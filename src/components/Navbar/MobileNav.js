import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Backdrop,
  makeStyles,
} from "@material-ui/core";

import { Link } from "gatsby";
import { useLocation } from "@reach/router";
import MoreMenu from "./MoreMenu";

import { AiOutlineDashboard } from "@react-icons/all-files/ai/AiOutlineDashboard.esm";
import { AiOutlineUser } from "@react-icons/all-files/ai/AiOutlineUser.esm";
import { AiOutlineUsergroupDelete } from "@react-icons/all-files/ai/AiOutlineUsergroupDelete.esm";
import { AiOutlineMore } from "@react-icons/all-files/ai/AiOutlineMore.esm";

import { IconContext } from "@react-icons/all-files/lib";

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
