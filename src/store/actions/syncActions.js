import axios from "axios";

import { SYNC_PENDING, SYNC_FAIL } from "../types";

export const syncData = () => async (dispatch, getState) => {
  dispatch({ type: SYNC_PENDING });
  const options = { headers: { "x-auth-token": getState().auth.token } };

  try {
    axios
      .post("/api/sync", "", options)
      .then((res) => {})
      .catch((err) => {
        dispatch({
          type: SYNC_FAIL,
          payload: { error: err },
        });
      });
  } catch (err) {}
};
