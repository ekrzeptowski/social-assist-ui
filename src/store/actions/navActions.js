import { TOGGLE_NAVBAR } from "../types";

export const toggleSidebar = () => async dispatch => {
  dispatch({ type: TOGGLE_NAVBAR });
};
