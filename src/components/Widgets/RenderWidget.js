import React from "react";
import FollowersCard from "./FollowersCard";
import FollowersChart from "./FollowersChart";
import DashCard from "./DashCard";

const KeysToComponentMap = {
  followersCard: FollowersCard,
  followersChart: FollowersChart,
  dashCard: DashCard,
};

const RenderWidget = (config, stringToStore) => {
  if (typeof KeysToComponentMap[config.component] !== "undefined") {
    let props = {};
    config.dependencies &&
      config.dependencies.forEach((prop) => {
        props[prop] = stringToStore[prop];
      });
    return React.createElement(KeysToComponentMap[config.component], {
      ...props,
      "data-grid": config.layout,
      data: config.data ? stringToStore[config.data] : undefined,
      link: config.link,
      key: config.key,
    });
  }
};

export default RenderWidget;
