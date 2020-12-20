import React, { lazy, Suspense, useEffect } from "react";
import { Router } from "@reach/router";
import Cookies from "js-cookie";

import Layout from "../layout/Layout";
import LandingLayout from "../layout/LandingLayout";
import FirstSync from "../components/Pages/FirstSync";

import { compose } from "redux";
import { connect, useDispatch } from "react-redux";
import { websocketConnect } from "../store/actions/websocketActions";
import { logInUserWithOauth, loadMe } from "../store/actions/authActions";
import {
  getFollowersHistory,
  getFollowersStats,
  getUnfollowers,
} from "../store/actions/followersActions";

import Loader from "../components/Loader/Loader";
import Landing from "../components/Pages/Landing";
import NotFound from "./404";

const Home = lazy(() => import("../components/Pages/Home"));
const Settings = lazy(() => import("../components/Pages/Settings"));
const Followers = lazy(() => import("../components/Pages/Followers"));
const Unfollowers = lazy(() => import("../components/Pages/Unfollowers"));
const Following = lazy(() => import("../components/Pages/Following"));
const NotFollowing = lazy(() => import("../components/Pages/NotFollowing"));
const NotFollowers = lazy(() => import("../components/Pages/NotFollowers"));
const FollowingBack = lazy(() => import("../components/Pages/FollowingBack"));

function Index({
  logInUserWithOauth,
  auth,
  loadMe,
  getFollowersHistory,
  getFollowersStats,
  getUnfollowers,
  followers: { unfollowers, totalFollowers, followersHistory },
  websocket,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.location.hash === "#_=_") window.location.hash = "";

    const cookieJwt = Cookies.get("x-auth-cookie");
    if (cookieJwt && !auth.isLoading && !auth.isAuthenticated && !auth.token) {
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
    if (auth.isAuthenticated && !websocket.connected) {
      dispatch(
        websocketConnect(
          process.env.NODE_ENV === "production"
            ? "wss://socialassist.ml/"
            : "wss://localhost:5000/"
        )
      );
    }
  }, [auth.isAuthenticated, websocket.connected, dispatch]);

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
                <Suspense fallback={<Loader />}>
                  <Router basepath="/">
                    <Followers path="/followers" />
                    <Following path="/following" />
                    <FollowingBack path="/followingback" />
                    <NotFollowers path="/notfollowers" />
                    <NotFollowing path="/notfollowing" />
                    <Unfollowers path="/unfollowers" />
                    <Settings path="/settings" />
                    <Home path="/" />
                  </Router>
                </Suspense>
              </Layout>
            ) : (
              <FirstSync />
            )
          ) : (
            <LandingLayout>
              <Router basepath="/">
                <Landing path="/" />
                <NotFound default />
              </Router>
            </LandingLayout>
          )}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  followers: state.followers,
  websocket: state.websocket,
});

export default compose(
  connect(mapStateToProps, {
    logInUserWithOauth,
    loadMe,
    getFollowersHistory,
    getFollowersStats,
    getUnfollowers,
  })
)(Index);
