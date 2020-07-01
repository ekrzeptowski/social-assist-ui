import {
  GET_FOLLOWERS_LOADING,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAIL
} from "../types";

const initialState = {
  isLoading: false,
  error: null,
  followers: [],
  totalFollowers: null,
  unfollowers: null,
  fetchedAt: null
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case GET_FOLLOWERS_LOADING:
      return {
        ...state,
        error: null,
        isLoading: true
      };
    case GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        followers: payload.followers,
        totalFollowers: payload.totalFollowers,
        unfollowers: payload.unfollowers,
        fetchedAt: payload.fetchedAt
      };
      case GET_FOLLOWERS_FAIL:
      return {
        ...state,
        error: payload.error,
        isLoading: false
      };
    default:
      return state;
  }
}
