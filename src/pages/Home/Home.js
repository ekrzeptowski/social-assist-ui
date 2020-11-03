import React, { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./styles.css";

import {
  getFollowersHistory,
  getFollowersStats,
  getUnfollowers,
} from "../../store/actions/followersActions";
import { editUser } from "../../store/actions/userActions";

import { Typography } from "@material-ui/core";

import RenderWidget from "../../components/Widgets/RenderWidget";

const defaultWidgets = [
  {
    component: "followersCard",
    key: "followersCard",
    dependencies: ["followersChange", "totalFollowers"],
    layout: { x: 0, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1 },
  },
  {
    component: "dashCard",
    key: "followingCard",
    data: "totalFollowing",
    link: { to: "/following", text: "Following" },
    layout: { x: 1, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1 },
  },
  {
    component: "dashCard",
    key: "notFollowersCount",
    data: "notFollowersCount",
    link: { to: "/notfollowers", text: "Not followers" },
    layout: { x: 2, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1 },
  },
  {
    component: "dashCard",
    key: "notFollowingCount",
    data: "notFollowingCount",
    link: { to: "/notfollowing", text: "Not following" },
    layout: { x: 3, y: 0, w: 1, h: 1, minW: 1, minH: 1, maxW: 1, maxH: 1 },
  },
  {
    component: "followersChart",
    key: "followersChart",
    dependencies: ["followersHistory"],
    layout: { x: 0, y: 0, w: 2, h: 2 },
  },
  {
    component: "recentUnfollowersCard",
    key: "recentUnfollowersCard",
    dependencies: ["unfollowers"],
    link: { to: "/unfollowers", text: "All unfollowers" },
    layout: { x: 2, y: 0, w: 2, h: 2, maxH: 3, maxW: 2 },
  },
];

const layout = {
  xxs: [
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
    {
      i: "notFollowersCount",
      x: 0,
      y: 1,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 1,
      maxH: 1,
    },
    {
      i: "notFollowingCount",
      x: 1,
      y: 1,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 1,
      maxH: 1,
    },
    { i: "followersChart", x: 0, y: 2, w: 2, h: 2 },
    { i: "recentUnfollowersCard", x: 0, y: 4, w: 2, h: 2, maxW: 2, maxH: 3 },
  ],
  xs: [
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
    {
      i: "notFollowersCount",
      x: 2,
      y: 0,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 1,
      maxH: 1,
    },
    {
      i: "notFollowingCount",
      x: 3,
      y: 0,
      w: 1,
      h: 1,
      minW: 1,
      minH: 1,
      maxW: 1,
      maxH: 1,
    },
    { i: "followersChart", x: 0, y: 1, w: 2, h: 2 },
    { i: "recentUnfollowersCard", x: 2, y: 1, w: 2, h: 2, maxW: 2, maxH: 3 },
  ],
};

const Home = ({
  auth,
  getFollowersHistory,
  getFollowersStats,
  getUnfollowers,
  followers: {
    isLoading,
    unfollowers,
    totalFollowers,
    totalFollowing,
    followersHistory,
    notFollowingCount,
    notFollowersCount,
  },
}) => {
  // const onLayoutChange = (layout, layouts) => {
  //   console.log(layouts);
  //   // setLayouts(layouts);
  // };

  const ResponsiveGridLayout = WidthProvider(Responsive);

  const followersChange =
    followersHistory[followersHistory.length - 1]?.followers -
    followersHistory[followersHistory.length - 2]?.followers;

  const stringToStore = {
    unfollowers,
    followersChange,
    followersHistory,
    totalFollowing,
    totalFollowers,
    notFollowersCount,
    notFollowingCount,
  };

  // const [widgets, setWidgets] = useState(defaultWidgets);
  // const [layouts, setLayouts] = useState({});

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

  if (!auth.isAuthenticated) return <Redirect to="/login" />;

  return (
    <div className="home-page">
      {auth.isAuthenticated && (
        <>
          <Typography variant="h5">Welcome @{auth.me.username}</Typography>
          <ResponsiveGridLayout
            breakpoints={{ sm: 960, xs: 600, xxs: 0 }}
            layouts={{ xxs: layout.xxs, xs: layout.xs }}
            // isDraggable={!mobile ? true : false}
            // isResizable={!mobile ? true : false}
            draggableHandle=".drag-handle"
            cols={{ sm: 6, xs: 4, xxs: 2 }}
            measureBeforeMount={true}
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
    getUnfollowers,
    editUser,
  })
)(Home);
