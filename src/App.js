import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import NotFound from "./pages/NotFound/NotFound";

import Loader from "./components/Loader/Loader";

import { logInUserWithOauth, loadMe } from "./store/actions/authActions";
import Followers from "./pages/Followers/Followers";
import Unfollowers from "./pages/Unfollowers/Unfollowers";

import { websocketConnect } from "./store/actions/websocketActions";
import Settings from "./pages/Settings/Settings";

const App = ({ logInUserWithOauth, auth, loadMe }) => {
  // useEffect(() => {
  //   loadMe();
  // }, [loadMe]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.hash === "#_=_") window.location.hash = "";

    const cookieJwt = Cookies.get("x-auth-cookie");
    if (cookieJwt && !auth.isAuthenticated && !auth.token) {
      // Cookies.remove('x-auth-cookie');
      logInUserWithOauth(cookieJwt);
    }
  }, []);

  useEffect(() => {
    if (!auth.isLoading && auth.token && !auth.isAuthenticated) {
      loadMe();
    }
  }, [
    auth.isAuthenticated,
    auth.token,
    loadMe,
    auth.isLoading,
    auth.appLoaded,
  ]);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(websocketConnect("wss://localhost:5000/"));
    }
  }, [auth.isAuthenticated]);
  return (
    <>
      {auth.appLoaded ? (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/followers" component={Followers} />
          <Route path="/unfollowers" component={Unfollowers} />
          <Route path="/settings" component={Settings} />
          <Route path="/notfound" component={NotFound} />
          <Route exact path="/:username" component={Profile} />
          <Route exact path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default compose(
  connect(mapStateToProps, { logInUserWithOauth, loadMe })
)(App);
