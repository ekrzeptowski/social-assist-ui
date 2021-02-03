import { combineReducers } from "redux";

import authReducer from "./authReducer";
import followersReducer from "./followersReducer";
import userReducer from "./userReducer";
import navReducer from "./navReducer";
import websocketReducer from "./websocketReducer";
import { syncSlice } from "../../features/sync/syncSlice";

export default combineReducers({
  auth: authReducer,
  followers: followersReducer,
  nav: navReducer,
  sync: syncSlice.reducer,
  user: userReducer,
  websocket: websocketReducer,
});
