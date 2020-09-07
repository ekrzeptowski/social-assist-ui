import {
  // WEBSOCKET_BROKEN,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  // WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  // WEBSOCKET_SEND,
  WEBSOCKET_DISCONNECT,
  SYNC_CHANGE,
  SYNC_SUCCESS,
  // GET_FOLLOWERS_LOADING,
  SYNC_FAIL,
} from "../types";
import {
  getFollowersStats,
  getFollowersHistory,
  getUnfollowers,
} from "../actions/followersActions";

const socketMiddleware = () => {
  let socket = null;
  const onMessage = (store) => (event) => {
    const payload = JSON.parse(event.data);
    switch (payload.type) {
      case "SYNC":
        switch (payload.status) {
          case "INFO":
            store.dispatch({
              type: SYNC_CHANGE,
              payload: { message: payload.message },
            });
            break;
          case "DONE":
            store.dispatch({
              type: SYNC_SUCCESS,
              payload: { message: payload.message },
            });
            store.dispatch(getFollowersStats());
            store.dispatch(getFollowersHistory());
            store.dispatch(getUnfollowers());
            break;
          case "ERROR":
            store.dispatch({
              type: SYNC_FAIL,
              payload: { error: payload.message },
            });
            break;
          default:
            break;
        }
        break;
      default:
        console.log(payload);
        break;
    }
  };
  return (store) => (next) => (action) => {
    switch (action.type) {
      case WEBSOCKET_CONNECT:
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = new WebSocket(action.host);

        socket.onopen = () => store.dispatch({ type: WEBSOCKET_OPEN });
        socket.onclose = () => store.dispatch({ type: WEBSOCKET_CLOSED });
        socket.onmessage = onMessage(store);

        break;

      case WEBSOCKET_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log("websocket closed");
        break;

      default:
        console.log("the next action:", action);
        return next(action);
    }
  };
};

export default socketMiddleware();
