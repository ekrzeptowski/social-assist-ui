import { combineReducers } from "redux";

import authReducer from "./authReducer";
import followersReducer from "./followersReducer";
import userReducer from "./userReducer";
import syncReducer from "./syncReducer";
import navReducer from "./navReducer";
import websocketReducer from "./websocketReducer";

export default combineReducers({
  auth: authReducer,
  followers: followersReducer,
  nav: navReducer,
  sync: syncReducer,
  user: userReducer,
  websocket: websocketReducer,
});
