import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { attachTokenToHeaders } from "../../helpers/attachTokenToHeaders";
import isEmpty from "../../helpers/isEmpty";

export const getFollowersStats = createAsyncThunk(
  "followers/getFollowersStats",
  async (params, ThunkAPI) => {
    const options = attachTokenToHeaders(ThunkAPI.getState);
    const response = await axios.get("/api/followers", options);
    const stats = await axios.get("/api/followers/stats", options);

    return {
      totalFollowers: response.data.totalFollowers,
      totalFollowing: response.data.totalFollowing,
      fetchedAt: response.data.fetchedAt,
      notFollowingCount: stats.data.notFollowingCount,
      notFollowersCount: stats.data.notFollowersCount,
    };
  },
);

export const getFollowersHistory = createAsyncThunk(
  "followers/getFollowersHistory",
  async (params, ThunkAPI) => {
    const options = attachTokenToHeaders(ThunkAPI.getState);
    const response = await axios.get("/api/followers/history", options);

    // Create timestamps for graph
    response.data.forEach((element) => {
      element.timestamp = Date.parse(element.date) / 1000;
    });

    return { followersHistory: response.data };
  },
);

export const getUnfollowers = createAsyncThunk(
  "followers/getUnfollowers",
  async (params, ThunkAPI) => {
    const options = attachTokenToHeaders(ThunkAPI.getState);
    const response = await axios.get(
      "/api/followers/unfollowers?page=1&limit=10&sort=-date",
      options,
    );

    return {
      unfollowers: isEmpty(response.data?.docs[0]) ? null : response.data?.docs,
    };
  },
);

export const followersSlice = createSlice({
  name: "followers",
  initialState: {
    isLoading: false,
    isLoaded: false,
    error: null,
    followers: [],
    followersHistory: [],
    totalFollowers: null,
    totalFollowing: null,
    unfollowers: null,
    fetchedAt: null,
    notFollowersCount: null,
    notFollowingCount: null,
  },
  reducers: {},
  extraReducers: {
    [getFollowersStats.pending]: (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
    },
    [getFollowersStats.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.isLoaded = true;
      state.totalFollowers = payload.totalFollowers;
      state.totalFollowing = payload.totalFollowers;
      state.fetchedAt = payload.fetchedAt;
      state.notFollowersCount = payload.notFollowersCount;
      state.notFollowingCount = payload.notFollowingCount;
    },
    [getFollowersStats.rejected]: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
    },
    [getFollowersHistory.pending]: (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
    },
    [getFollowersHistory.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.followersHistory = payload.followersHistory;
    },
    [getFollowersHistory.rejected]: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
    },
    [getUnfollowers.pending]: (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
    },
    [getUnfollowers.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.unfollowers = payload.unfollowers;
    },
    [getUnfollowers.rejected]: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
    },
  },
});
