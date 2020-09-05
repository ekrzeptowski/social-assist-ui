import React from "react";
import FollowersCard from "./FollowersCard";
import FollowingCard from "./FollowingCard";
import FollowersChart from "./FollowersChart";

const KeysToComponentMap = {
  followersCard: FollowersCard,
  followingCard: FollowingCard,
  followersChart: FollowersChart,
};

const RenderWidget = (config, stringToStore) => {
  if (typeof KeysToComponentMap[config.component] !== "undefined") {
    let props = {};
    config.dependencies.forEach((prop) => {
      props[prop] = stringToStore[prop];
    });
    return React.createElement(KeysToComponentMap[config.component], {
      ...props,
      "data-grid": config.layout,
      key: config.component,
    });
  }
};

export default RenderWidget;
