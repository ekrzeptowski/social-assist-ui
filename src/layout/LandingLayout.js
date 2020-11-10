import React from "react";
import PropTypes from "prop-types";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    minHeight: "100vh",
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

const LandingLayout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Container>{children}</Container>
      </div>
      <Footer />
    </div>
  );
};

LandingLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LandingLayout;
