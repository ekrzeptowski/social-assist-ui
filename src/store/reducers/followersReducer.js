import {
  GET_FOLLOWERS_LOADING,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAIL,
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

const initialState = {
  isLoading: false,
  error: null,
  followers: [],
  followersHistory: [],
  totalFollowers: null,
  totalFollowing: null,
  unfollowers: null,
  fetchedAt: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case GET_FOLLOWERS_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        followers: payload.followers,
      };
    case GET_FOLLOWERS_FAIL:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    case GET_FOLLOWERS_STATS_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_FOLLOWERS_STATS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        totalFollowers: payload.totalFollowers,
        totalFollowing: payload.totalFollowing,
        fetchedAt: payload.fetchedAt,
      };
    case GET_FOLLOWERS_STATS_FAIL:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    case GET_FOLLOWERS_HISTORY_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_FOLLOWERS_HISTORY_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        followersHistory: payload.followersHistory,
      };
    case GET_FOLLOWERS_HISTORY_FAIL:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    case GET_UNFOLLOWERS_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true,
      };
    case GET_UNFOLLOWERS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        unfollowers: payload.unfollowers,
      };
    case GET_UNFOLLOWERS_FAIL:
      return {
        ...state,
        error: payload.error,
        isLoading: false,
      };
    default:
      return state;
  }
}
