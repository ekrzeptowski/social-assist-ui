import React from "react";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./store/reducers";
import socketMiddleware from "./store/middleware/websocket";

const initialState = {};

const windowGlobal = typeof window !== "undefined" && window;

const devtools =
  process.env.NODE_ENV === "development" && windowGlobal.devToolsExtension
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f;

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(thunk, socketMiddleware), devtools)
);

export default ({ element }) => <Provider store={store}>{element}</Provider>;
