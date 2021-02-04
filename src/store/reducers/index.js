import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import websocketReducer from "./websocketReducer";
import { syncSlice } from "../../features/sync/syncSlice";
import { followersSlice } from "../../features/followers/followersSlice";
import { navSlice } from "../../features/nav/navSlice";

export default combineReducers({
  auth: authReducer,
  followers: followersSlice.reducer,
  nav: navSlice.reducer,
  sync: syncSlice.reducer,
  user: userReducer,
  websocket: websocketReducer,
});
