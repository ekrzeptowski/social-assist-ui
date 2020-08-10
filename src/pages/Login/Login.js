import React from "react";
import { withRouter, Redirect } from "react-router-dom";

import { compose } from "redux";
import { connect } from "react-redux";

import { TWITTER_AUTH_LINK } from "../../constants";

import Typography from "@material-ui/core/Typography";
import { Button, Container } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";

const Login = ({ auth, history }) => {
  if (auth.isAuthenticated) return <Redirect to="/" />;

  return (
    <Container maxWidth="md">
      <Typography variant="h2" gutterBottom>
        Welcome to the Social Assistant
      </Typography>
      <form>
        <Typography variant="h4" gutterBottom>
          Log in with social media
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<TwitterIcon />}
          href={TWITTER_AUTH_LINK}
        >
          Login with Twitter
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<InstagramIcon />}
          href={TWITTER_AUTH_LINK}
          disabled
        >
          Login with Instagram
        </Button>
      </form>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default compose(withRouter, connect(mapStateToProps))(Login);
