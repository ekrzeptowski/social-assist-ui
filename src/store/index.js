import React from "react";
import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

import reduxWebsocket from "@giantmachines/redux-websocket";
import socketMiddleware from "./middleware/websocket";

import { Provider } from "react-redux";

const initialState = {};

const windowGlobal = typeof window !== "undefined" && window;

const reduxWebsocketMiddleware = reduxWebsocket();

const devtools =
  process.env.NODE_ENV === "development" && windowGlobal.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, reduxWebsocketMiddleware, socketMiddleware),
    devtools
  )
);

export default ({ element }) => <Provider store={store}>{element}</Provider>;
