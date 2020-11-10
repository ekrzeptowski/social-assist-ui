import React from "react";
import PropTypes from "prop-types";

import Navbar from "../components/Navbar/Navbar";
import MobileNav from "../components/Navbar/MobileNav";
import Sidebar from "../components/Sidebar/Sidebar";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  mobileNav: {
    position: "fixed",
    zIndex: 5,
    width: "100%",
    bottom: 0,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3)
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div className={classes.root}>
      <Navbar />
      {!mobile && <Sidebar />}
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="md">{children}</Container>
        {mobile && <div className={classes.toolbar} />}
      </div>
      {mobile && <MobileNav className={classes.mobileNav} />}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
