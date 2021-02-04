import { combineReducers } from "redux";

import websocketReducer from "./websocketReducer";
import { syncSlice } from "../../features/sync/syncSlice";
import { followersSlice } from "../../features/followers/followersSlice";
import { navSlice } from "../../features/nav/navSlice";
import { userSlice } from "../../features/user/userSlice";
import { authSlice } from "../../features/auth/authSlice";

export default combineReducers({
  auth: authSlice.reducer,
  followers: followersSlice.reducer,
  nav: navSlice.reducer,
  sync: syncSlice.reducer,
  user: userSlice.reducer,
  websocket: websocketReducer,
});
