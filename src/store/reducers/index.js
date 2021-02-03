import { combineReducers } from "redux";

import authReducer from "./authReducer";
import userReducer from "./userReducer";
import navReducer from "./navReducer";
import websocketReducer from "./websocketReducer";
import { syncSlice } from "../../features/sync/syncSlice";
import { followersSlice } from "../../features/followers/followersSlice";

export default combineReducers({
  auth: authReducer,
  followers: followersSlice.reducer,
  nav: navReducer,
  sync: syncSlice.reducer,
  user: userReducer,
  websocket: websocketReducer,
});
