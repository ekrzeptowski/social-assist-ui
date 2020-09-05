import React, { useEffect, useState } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import {
  getFollowersHistory,
  getFollowersStats,
} from "../../store/actions/followersActions";
import { editUser } from "../../store/actions/userActions";

import { Typography } from "@material-ui/core";

import RenderWidget from "../../components/Widgets/RenderWidget";

const useStyles = makeStyles({
  card: {
    // minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
});

const defaultWidgets = [
  {
    component: "followersCard",
    dependencies: ["followersChange", "totalFollowers"],
    layout: { x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1 },
  },
  {
    component: "followingCard",
    dependencies: ["totalFollowing"],
    layout: { x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1 },
  },
  {
    component: "followersChart",
    dependencies: ["followersHistory"],
    layout: { x: 0, y: 0, w: 2, h: 2 },
  },
];

const Home = ({
  auth,
  getFollowersHistory,
  getFollowersStats,
  editUser,
  followers: { isLoading, totalFollowers, totalFollowing, followersHistory },
}) => {
  const classes = useStyles();

  const onLayoutChange = (layout, layouts) => {
    console.log(layouts);
    // setLayouts(layouts);
  };

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const followersChange =
    followersHistory[followersHistory.length - 1]?.followers -
    followersHistory[followersHistory.length - 2]?.followers;

  const stringToStore = {
    followersChange,
    followersHistory,
    totalFollowing,
    totalFollowers,
  };

  // const [widgets, setWidgets] = useState(defaultWidgets);
  // const [layouts, setLayouts] = useState({});

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
            layouts={{}}
            cols={{ sm: 6, xs: 4, xxs: 2 }}
            // onLayoutChange={(layout, layouts) =>
            //   onLayoutChange(layout, layouts)
            // }
            rowHeight={110}
          >
            {defaultWidgets.map((config) =>
              RenderWidget(config, stringToStore)
            )}
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
    editUser,
  })
)(Home);
