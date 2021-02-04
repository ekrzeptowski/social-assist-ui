import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { attachTokenToHeaders } from "../../helpers/attachTokenToHeaders";
import { loadMe, logOutUser } from "../auth/authSlice";
import { getFollowersHistory } from "../followers/followersSlice";

export const editUser = createAsyncThunk(
  "user/editUser",
  async ({ id, formData, history }, ThunkAPI) => {
    const options = attachTokenToHeaders(ThunkAPI.getState);
    const response = await axios.put(`/api/users/${id}`, formData, options);

    if (ThunkAPI.getState().auth.me?.id === response.data.user.id) {
      ThunkAPI.dispatch(loadMe());
      ThunkAPI.dispatch(getFollowersHistory());
    }

    return {
      user: response.data.user,
    };
  },
);

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async ({ username, history }, ThunkAPI) => {
    try {
      const options = attachTokenToHeaders(ThunkAPI.getState);
      const response = await axios.get(`/api/users/${username}`, options);
      return { profile: response.data.user };
    } catch (error) {
      if (error?.response.status === 404) {
        history.push("/notfound");
        return { error: error?.response?.data.message || error.message };
      }
    }
  },
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async ({ id, history }, ThunkAPI) => {
    try {
      const options = attachTokenToHeaders(ThunkAPI.getState);
      const response = await axios.delete(`/api/users/${id}`, options);

      //logout only if he deleted himself
      if (ThunkAPI.getState().auth.me.id === response.data.user.id) {
        ThunkAPI.dispatch(logOutUser(id, history));
      }
      history.push("/users");
      return { message: response.data.user };
    } catch (error) {
      return { error: error?.response?.data.message || error.message };
    }
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {},
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [editUser.pending]: (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
    },
    [editUser.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.profile = payload.user;
    },
    [editUser.rejected]: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
      state.profile = {};
    },
    [getProfile.pending]: (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
    },
    [getProfile.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.profile = payload.user;
    },
    [getProfile.rejected]: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
      state.profile = {};
    },
    [deleteUser.pending]: (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.profile = {};
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
      state.profile = {};
    },
  },
});

export default userSlice.reducer;
