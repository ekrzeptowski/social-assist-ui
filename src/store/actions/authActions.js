import axios from "axios";
import { navigate } from "gatsby";

import { attachTokenToHeaders } from "./../../helpers/attachTokenToHeaders";

import {
  LOGIN_WITH_OAUTH_LOADING,
  LOGIN_WITH_OAUTH_SUCCESS,
  LOGIN_WITH_OAUTH_FAIL,
  LOGOUT_SUCCESS,
  ME_LOADING,
  ME_SUCCESS,
  ME_FAIL,
} from "../types";

export const loadMe = () => async (dispatch, getState) => {
  dispatch({ type: ME_LOADING });

  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get("/api/users/me", options);

    dispatch({
      type: ME_SUCCESS,
      payload: { me: response.data.me },
    });
  } catch (err) {
    dispatch({
      type: ME_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

// export const loginUserWithEmail = (formData, history) => async (dispatch, getState) => {
//   dispatch({ type: LOGIN_WITH_EMAIL_LOADING });
//   try {
//     const response = await axios.post('/auth/login', formData);

//     dispatch({
//       type: LOGIN_WITH_EMAIL_SUCCESS,
//       payload: { token: response.data.token, me: response.data.me },
//     });

//     dispatch(loadMe());
//     history.push('/');
//   } catch (err) {
//     dispatch({
//       type: LOGIN_WITH_EMAIL_FAIL,
//       payload: { error: err.response.data.message },
//     });
//   }
// };

export const logInUserWithOauth = (token) => async (dispatch, getState) => {
  dispatch({ type: LOGIN_WITH_OAUTH_LOADING });

  try {
    const headers = {
      "Content-Type": "application/json",
      "x-auth-token": token,
    };

    const response = await axios.get("/api/users/me", { headers });

    dispatch({
      type: LOGIN_WITH_OAUTH_SUCCESS,
      payload: { me: response.data.me, token },
    });
  } catch (err) {
    dispatch({
      type: LOGIN_WITH_OAUTH_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

// Log user out
export const logOutUser = (history) => async (dispatch) => {
  try {
    deleteAllCookies();
    //just to log user logut on the server
    await axios.get("/auth/logout");

    dispatch({
      type: LOGOUT_SUCCESS,
    });
    navigate("/");
    // if (history) history.push("/");
  } catch (err) {}
};

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
