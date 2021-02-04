import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { navigate } from "gatsby";
import { attachTokenToHeaders } from "../../helpers/attachTokenToHeaders";

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

export const loadMe = createAsyncThunk(
  "auth/loadMe",
  async (params, ThunkAPI) => {
    const options = attachTokenToHeaders(ThunkAPI.getState);
    const response = await axios.get("/api/users/me", options);

    return {
      me: response.data.me,
    };
  },
);

export const logInUserWithOauth = createAsyncThunk(
  "user/logInUserWithOauth",
  async (token, ThunkAPI) => {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };
    const response = await axios.get("/api/users/me", { headers });
    return { me: response.data.me, token };
  },
);

export const logOutUser = createAsyncThunk(
  "user/logOutUser",
  async (history, ThunkAPI) => {
    deleteAllCookies();
    await axios.get("/auth/logout");
    navigate("/");
    return;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token:
      typeof localStorage != "undefined" ? localStorage.getItem("token") : null,
    isAuthenticated: false,
    isLoading: false,
    me: null,
    error: null,
    appLoaded: true,
  },
  reducers: {},
  extraReducers: {
    [loadMe.pending]: (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
      state.appLoaded = false;
    },
    [loadMe.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.me = payload.me;
      state.appLoaded = true;
    },
    [loadMe.rejected]: (state, { payload }) => {
      localStorage.removeItem("token");
      state.error = null;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.me = null;
      state.appLoaded = true;
    },
    [logInUserWithOauth.pending]: (state, { payload }) => {
      state.error = null;
      state.isLoading = true;
    },
    [logInUserWithOauth.fulfilled]: (state, { payload }) => {
      localStorage.setItem("token", payload.token);
      state.error = null;
      state.isLoading = false;
      state.isAuthenticated = true;
      state.token = payload.token;
      state.me = payload.me;
    },
    [logInUserWithOauth.rejected]: (state, { payload }) => {
      state.error = payload.error;
      state.isLoading = false;
    },
    // [logOutUser.pending]: (state, { payload }) => {
    //   state.error = null;
    //   state.isLoading = true;
    // },
    [logOutUser.fulfilled]: (state, { payload }) => {
      localStorage.removeItem("token");
      state.error = null;
      state.isLoading = false;
      state.isAuthenticated = false;
      state.me = null;
      state.token = null;
    },
    // [logOutUser.rejected]: (state, { payload }) => {
    //   state.error = payload.error;
    //   state.isLoading = false;
    //   state.profile = {};
    // },
  },
});

export default authSlice.reducer;
