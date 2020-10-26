import axios from 'axios';
import Cookies from 'js-cookie';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_CURRENT_USER,
  SET_USER,
  UNSET_USER,
} from '../types/authTypes';

export const loginAction = (user) => (dispatch) => {
  const promise = axios.post('https://unptitfive-server.herokuapp.com/user/login', {
    ...user,
  }, {
    withCredentials: true,
  });
  promise.then(
    (res) => {
      Cookies.set('isConnected', true);
      Cookies.set('user', res.data.user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user,
      });
    },
    (error) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.data,
      });
    },
  );
};

export const registerAction = (user) => (dispatch) => {
  const promise = axios.post('https://unptitfive-server.herokuapp.com/user/register', {
    ...user,
  });
  promise.then(
    (res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    },
    (error) => {
      dispatch({
        type: REGISTER_ERROR,
        payload: error.data,
      });
    },
  );
};

export const getCurrentUserAction = () => (dispatch) => {
  dispatch({
    type: GET_CURRENT_USER,
    payload: Cookies.get('user'),
  });
};

export const setUserAction = (dataUser) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: dataUser,
  });
};

export const unsetUserAction = () => (dispatch) => {
  Cookies.remove('user');
  Cookies.remove('isConnected');
  dispatch({ type: UNSET_USER });
};
