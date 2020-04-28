import { SYNC_PENDING, SYNC_CHANGE, SYNC_SUCCESS, SYNC_FAIL } from "../types";

const initialState = {
  isLoading: false,
  error: null,
  statusMessage: null
  // totalFollowers: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SYNC_PENDING:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case SYNC_CHANGE:
      return {
        ...state,
        error: null,
        statusMessage: payload.message
      };
    case SYNC_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        statusMessage: payload.message
        // totalFollowers: payload.totalFollowers
      };
    case SYNC_FAIL:
      return {
        ...state,
        error: payload.error,
        isLoading: false
      };
    default:
      return state;
  }
}
