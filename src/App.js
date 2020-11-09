import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

import Loader from "./components/Loader/Loader";

import { logInUserWithOauth, loadMe } from "./store/actions/authActions";
import {
  getFollowersHistory,
  getFollowersStats,
  getUnfollowers,
} from "./store/actions/followersActions";

import Followers from "./pages/Followers/Followers";
import Unfollowers from "./pages/Unfollowers/Unfollowers";

import { websocketConnect } from "./store/actions/websocketActions";
import Settings from "./pages/Settings/Settings";
import Following from "./pages/Following/Following";
import NotFollowing from "./pages/NotFollowing/NotFollowing";
import NotFollowers from "./pages/NotFollowers/NotFollowers";
import Layout from "./layout/Layout";
import FollowingBack from "./pages/FollowingBack/FollowingBack";
import Landing from "./pages/Landing/Landing";
import LandingLayout from "./layout/LandingLayout";
import FirstSync from "./pages/FirstSync/FirstSync";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

const App = ({
  logInUserWithOauth,
  auth,
  loadMe,
  getFollowersHistory,
  getFollowersStats,
  getUnfollowers,
  followers: {
    fetchedAt,
    isLoading,
    unfollowers,
    totalFollowers,
    // totalFollowing,
    followersHistory,
    // notFollowingCount,
    // notFollowersCount,
  },
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.hash === "#_=_") window.location.hash = "";

    const cookieJwt = Cookies.get("x-auth-cookie");
    if (cookieJwt && !auth.isLoading && !auth.isAuthenticated && !auth.token) {
      // Cookies.remove('x-auth-cookie');
      logInUserWithOauth(cookieJwt);
    }
  });

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
  }, [auth.isAuthenticated, dispatch]);

  useEffect(() => {
    if (!totalFollowers && auth.isAuthenticated) {
      getFollowersStats();
    }
  }, [auth.isAuthenticated, getFollowersStats, totalFollowers]);
  useEffect(() => {
    if (followersHistory.length === 0 && auth.isAuthenticated) {
      getFollowersHistory();
    }
  }, [auth.isAuthenticated, getFollowersHistory, followersHistory.length]);

  useEffect(() => {
    if (!unfollowers && auth.isAuthenticated) {
      getUnfollowers();
    }
  }, [auth.isAuthenticated, getUnfollowers, unfollowers]);

  return (
    <>
      {auth.appLoaded ? (
        <>
          {auth.isAuthenticated ? (
            auth.me.fetchedAt ? (
              <Layout>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/followers" component={Followers} />
                  <Route path="/following" component={Following} />
                  <Route path="/followingback" component={FollowingBack} />
                  <Route path="/notfollowers" component={NotFollowers} />
                  <Route path="/notfollowing" component={NotFollowing} />
                  <Route path="/unfollowers" component={Unfollowers} />
                  <Route path="/settings" component={Settings} />
                  <Route path="/notfound" component={NotFound} />
                  <Route path="/privacy" component={PrivacyPolicy} />
                  <Route exact path="/" component={Home} />
                  <Route component={NotFound} />
                </Switch>
              </Layout>
            ) : (
              <FirstSync />
            )
          ) : (
            <LandingLayout>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/privacy" component={PrivacyPolicy} />
              </Switch>
            </LandingLayout>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  followers: state.followers,
});

export default compose(
  connect(mapStateToProps, {
    logInUserWithOauth,
    loadMe,
    getFollowersHistory,
    getFollowersStats,
    getUnfollowers,
  })
)(App);
