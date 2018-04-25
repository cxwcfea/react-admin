import axios from 'axios';
import { message } from 'antd';

import { saveUserInfo, loadUserInfo, removeUserInfo } from '../../utils';
import * as actionTypes from './actionTypes';

const LOGIN_URL = 'http://localhost:3002/auth/login';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userInfo) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userInfo,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  removeUserInfo();
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const auth = (payload) => {
  return dispatch => {
    dispatch(authStart());
    (async () => {
      try {
        const response = await axios.post(LOGIN_URL, payload);
        const token = response.data.data;
        const userInfo = saveUserInfo(token);
        dispatch(authSuccess(token, userInfo));
      } catch (err) {
        const errMsg = err.response ? err.response.data.message : err.message;
        message.error(errMsg);
        dispatch(authFail(errMsg));
      }
    })();
  };
};

export const checkAuthState = () => {
  return dispatch => {
    const { token, userInfo } = loadUserInfo();
    if (!token) {
      dispatch(logout());
      return;
    }
    const expirationDate = new Date(userInfo.exp * 1000);
    console.log('checkAuthState:', expirationDate);
    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token, userInfo));
    }
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};
