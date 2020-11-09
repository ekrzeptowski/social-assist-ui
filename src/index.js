import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import rootReducer from "./store/reducers";
import socketMiddleware from "./store/middleware/websocket";
import {
  colors,
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core";

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk, socketMiddleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

let theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.blue[500],
    },
  },
});

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
