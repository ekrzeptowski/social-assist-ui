import { REDUX_WEBSOCKET_MESSAGE } from "../types";
import {
  getFollowersStats,
  getFollowersHistory,
  getUnfollowers,
} from "../../features/followers/followersSlice";
import { loadMe } from "../../features/auth/authSlice";
import {
  syncChange,
  syncFail,
  syncSuccess,
} from "../../features/sync/syncSlice";

const socketMiddleware = () => {
  return (store) => (next) => (action) => {
    switch (action.type) {
      case REDUX_WEBSOCKET_MESSAGE:
        const payload = JSON.parse(action.payload.message);
        switch (payload.type) {
          case "SYNC":
            switch (payload.status) {
              case "INFO":
                store.dispatch(
                  syncChange({
                    message: payload.message,
                    progress: payload.progress || null,
                  }),
                );
                break;
              case "DONE":
                store.dispatch(syncSuccess({ message: payload.message }));
                !store.getState().auth?.me?.fetchedAt &&
                  store.dispatch(loadMe());
                store.dispatch(getFollowersStats());
                store.dispatch(getFollowersHistory());
                store.dispatch(getUnfollowers());
                break;
              case "ERROR":
                store.dispatch(syncFail({ error: payload.message }));
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
