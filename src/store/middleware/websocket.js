import {
  SYNC_CHANGE,
  SYNC_SUCCESS,
  SYNC_FAIL,
  REDUX_WEBSOCKET_MESSAGE,
} from "../types";
import {
  getFollowersStats,
  getFollowersHistory,
  getUnfollowers,
} from "../actions/followersActions";
import { loadMe } from "../actions/authActions";

const socketMiddleware = () => {
  return (store) => (next) => (action) => {
    switch (action.type) {
      case REDUX_WEBSOCKET_MESSAGE:
        const payload = JSON.parse(action.payload.message);
        switch (payload.type) {
          case "SYNC":
            switch (payload.status) {
              case "INFO":
                store.dispatch({
                  type: SYNC_CHANGE,
                  payload: {
                    message: payload.message,
                    progress: payload.progress || null,
                  },
                });
                break;
              case "DONE":
                store.dispatch({
                  type: SYNC_SUCCESS,
                  payload: { message: payload.message },
                });
                !store.getState().auth?.me?.fetchedAt &&
                  store.dispatch(loadMe());
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
            break;
        }
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
