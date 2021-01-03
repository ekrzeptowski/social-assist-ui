import {
  WEBSOCKET_BROKEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
  WEBSOCKET_ERROR,
} from "@giantmachines/redux-websocket";

export const LOGIN_WITH_OAUTH_LOADING = "LOGIN_WITH_OAUTH_LOADING";
export const LOGIN_WITH_OAUTH_SUCCESS = "LOGIN_WITH_OAUTH_SUCCESS";
export const LOGIN_WITH_OAUTH_FAIL = "LOGIN_WITH_OAUTH_FAIL";

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

export const ME_LOADING = "ME_LOADING";
export const ME_SUCCESS = "ME_SUCCESS";
export const ME_FAIL = "ME_FAIL";

export const GET_FEATURE = "GET_FEATURE";
export const GET_PROFILE = "GET_PROFILE";

export const GET_PROFILE_LOADING = "GET_PROFILE_LOADING";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";

export const EDIT_USER_LOADING = "EDIT_USER_LOADING";
export const EDIT_USER_SUCCESS = "EDIT_USER_SUCCESS";
export const EDIT_USER_FAIL = "EDIT_USER_FAIL";

export const DELETE_USER_LOADING = "DELETE_USER_LOADING";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAIL = "DELETE_USER_FAIL";

export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";

export const GET_FOLLOWERS_LOADING = "GET_FOLLOWERS_LOADING";
export const GET_FOLLOWERS_SUCCESS = "GET_FOLLOWERS_SUCCESS";
export const GET_FOLLOWERS_FAIL = "GET_FOLLOWERS_FAIL";

export const GET_FOLLOWERS_STATS_LOADING = "GET_FOLLOWERS_STATS_LOADING";
export const GET_FOLLOWERS_STATS_SUCCESS = "GET_FOLLOWERS_STATS_SUCCESS";
export const GET_FOLLOWERS_STATS_FAIL = "GET_FOLLOWERS_STATS_FAIL";

export const GET_FOLLOWERS_HISTORY_LOADING = "GET_FOLLOWERS_HISTORY_LOADING";
export const GET_FOLLOWERS_HISTORY_SUCCESS = "GET_FOLLOWERS_HISTORY_SUCCESS";
export const GET_FOLLOWERS_HISTORY_FAIL = "GET_FOLLOWERS_HISTORY_FAIL";

export const GET_UNFOLLOWERS_LOADING = "GET_UNFOLLOWERS_LOADING";
export const GET_UNFOLLOWERS_SUCCESS = "GET_UNFOLLOWERS_SUCCESS";
export const GET_UNFOLLOWERS_FAIL = "GET_UNFOLLOWERS_FAIL";

export const SYNC_PENDING = "SYNC_PENDING";
export const SYNC_CHANGE = "SYNC_CHANGE";
export const SYNC_SUCCESS = "SYNC_SUCCESS";
export const SYNC_FAIL = "SYNC_FAIL";

const WEBSOCKET_PREFIX = "REDUX_WEBSOCKET";

export const REDUX_WEBSOCKET_BROKEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_BROKEN}`;
export const REDUX_WEBSOCKET_OPEN = `${WEBSOCKET_PREFIX}::${WEBSOCKET_OPEN}`;
export const REDUX_WEBSOCKET_CLOSED = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CLOSED}`;
export const REDUX_WEBSOCKET_MESSAGE = `${WEBSOCKET_PREFIX}::${WEBSOCKET_MESSAGE}`;
export const REDUX_WEBSOCKET_CONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_CONNECT}`;
export const REDUX_WEBSOCKET_DISCONNECT = `${WEBSOCKET_PREFIX}::${WEBSOCKET_DISCONNECT}`;
export const REDUX_WEBSOCKET_SEND = `${WEBSOCKET_PREFIX}::${WEBSOCKET_SEND}`;
export const REDUX_WEBSOCKET_ERROR = `${WEBSOCKET_PREFIX}::${WEBSOCKET_ERROR}`;
