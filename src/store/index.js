import React from "react";

import rootReducer from "./reducers";

import reduxWebsocket from "@giantmachines/redux-websocket";
import socketMiddleware from "./middleware/websocket";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const reduxWebsocketMiddleware = reduxWebsocket();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(reduxWebsocketMiddleware)
      .concat(socketMiddleware),
});

export default ({ element }) => <Provider store={store}>{element}</Provider>;
