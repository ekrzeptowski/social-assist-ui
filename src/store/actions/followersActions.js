import axios from 'axios';

// import { getMessages } from './messageActions';
import {
  GET_FOLLOWERS_LOADING,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAIL
} from "../types";
import { attachTokenToHeaders } from './authActions';

export const getFollowers = () => async (dispatch, getState) => {
  dispatch({ type: GET_FOLLOWERS_LOADING });

  try {
    const options = attachTokenToHeaders(getState)
    const response = await axios.get('/api/followers', options);

    dispatch({
      type: GET_FOLLOWERS_SUCCESS,
      payload: { followers: response.data.followers, totalFollowers: response.data.totalFollowers, fetchedAt: response.data.fetchedAt },
    });
  } catch (err) {
    dispatch({
      type: GET_FOLLOWERS_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};