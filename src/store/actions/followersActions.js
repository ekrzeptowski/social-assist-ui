import axios from "axios";
// import { getMessages } from './messageActions';
import {
  GET_FOLLOWERS_FAIL,
  GET_FOLLOWERS_LOADING,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_STATS_LOADING,
  GET_FOLLOWERS_STATS_SUCCESS,
  GET_FOLLOWERS_STATS_FAIL,
  GET_FOLLOWERS_HISTORY_FAIL,
  GET_FOLLOWERS_HISTORY_LOADING,
  GET_FOLLOWERS_HISTORY_SUCCESS,
  GET_UNFOLLOWERS_FAIL,
  GET_UNFOLLOWERS_LOADING,
  GET_UNFOLLOWERS_SUCCESS,
} from "../types";
import { attachTokenToHeaders } from "./authActions";

import isEmpty from "../../helpers/isEmpty";

export const getFollowers = () => async (dispatch, getState) => {
  dispatch({ type: GET_FOLLOWERS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get("/api/followers/followers", options);

    dispatch({
      type: GET_FOLLOWERS_SUCCESS,
      payload: {
        followers: response.data,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_FOLLOWERS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const getFollowersStats = () => async (dispatch, getState) => {
  dispatch({ type: GET_FOLLOWERS_STATS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get("/api/followers", options);
    const stats = await axios.get("/api/followers/stats", options);

    dispatch({
      type: GET_FOLLOWERS_STATS_SUCCESS,
      payload: {
        totalFollowers: response.data.totalFollowers,
        totalFollowing: response.data.totalFollowing,
        fetchedAt: response.data.fetchedAt,
        notFollowingCount: stats.data.notFollowingCount,
        notFollowersCount: stats.data.notFollowersCount,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_FOLLOWERS_STATS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const getUnfollowers = () => async (dispatch, getState) => {
  dispatch({ type: GET_UNFOLLOWERS_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(
      "/api/followers/unfollowers?page=1&limit=5&sort=-date",
      options
    );
    response.data.docs &&
      dispatch({
        type: GET_UNFOLLOWERS_SUCCESS,
        payload: {
          unfollowers: isEmpty(response.data?.docs[0])
            ? null
            : response.data?.docs,
        },
      });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_UNFOLLOWERS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const getFollowersHistory = () => async (dispatch, getState) => {
  dispatch({ type: GET_FOLLOWERS_HISTORY_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get("/api/followers/history", options);

    response.data.forEach((element) => {
      element.timestamp = Date.parse(element.date) / 1000;
    });

    dispatch({
      type: GET_FOLLOWERS_HISTORY_SUCCESS,
      payload: {
        followersHistory: response.data,
      },
    });
  } catch (err) {
    dispatch({
      type: GET_FOLLOWERS_HISTORY_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};
