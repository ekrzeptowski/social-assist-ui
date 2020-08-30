import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import RGL, { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  getFollowersHistory,
  getFollowersStats,
} from "../../store/actions/followersActions";

import { Typography } from "@material-ui/core";
import FollowersCard from "../../components/Widgets/FollowersCard";
import FollowingCard from "../../components/Widgets/FollowingCard";
import FollowersChart from "../../components/Widgets/FollowersChart";

const useStyles = makeStyles({
  card: {
    // minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

const Home = ({
  auth,
  getFollowersHistory,
  getFollowersStats,
  followers: { isLoading, totalFollowers, totalFollowing, followersHistory },
}) => {
  const classes = useStyles();

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const followersChange =
    followersHistory[followersHistory.length - 1]?.followers -
    followersHistory[followersHistory.length - 2]?.followers;

  useEffect(() => {
    if (!totalFollowers && !isLoading && auth.isAuthenticated) {
      getFollowersStats();
      getFollowersHistory();
    }
  }, [
    auth.isAuthenticated,
    getFollowersHistory,
    getFollowersStats,
    isLoading,
    totalFollowers,
  ]);

  if (!auth.isAuthenticated) return <Redirect to="/login" />;

  const layout = [
    {
      i: "followersCard",
      x: 0,
      y: 0,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 1,
      maxH: 1,
    },
    {
      i: "followingCard",
      x: 1,
      y: 0,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 1,
      maxH: 1,
    },
    { i: "followersChart", x: 0, y: 1, w: 2, h: 2 },
  ];

  return (
    <div className="home-page">
      {!auth.isAuthenticated ? (
        <div>
          <p>
            Welcome guest!{" "}
            <Link className="bold" to="/login">
              Log in
            </Link>{" "}
            or{" "}
            <Link className="bold" to="/register">
              Register
            </Link>
          </p>
        </div>
      ) : (
        <>
          <Typography variant="h5">Welcome @{auth.me.username}</Typography>
          <ResponsiveGridLayout
            breakpoints={{ sm: 960, xs: 600, xxs: 0 }}
            layouts={{
              sm: layout,
              xs: layout,
              xxs: layout,
            }}
            cols={{ sm: 6, xs: 4, xxs: 2 }}
            rowHeight={110}
          >
            <FollowersCard
              key="followersCard"
              {...{ followersChange, totalFollowers }}
            />
            <FollowingCard key="followingCard" {...{ totalFollowing }} />
            <FollowersChart key="followersChart" {...{ followersHistory }} />
          </ResponsiveGridLayout>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  followers: state.followers,
});

export default compose(
  connect(mapStateToProps, {
    getFollowersHistory,
    getFollowersStats,
  })
)(Home);
