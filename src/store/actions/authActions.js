import axios from 'axios';
import Cookies from 'js-cookie';

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_CURRENT_USER,
  GET_CURRENT_USER_ERROR,
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
      Cookies.set('token', res.data.user.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user,
      });
    },
    (error) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.message,
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
        payload: error.response.data.message,
      });
    },
  );
};

export const getCurrentUserAction = () => (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  };
  const promise = axios.get('https://unptitfive-server.herokuapp.com/user/profile', config);
  promise.then(
    (res) => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data,
      });
    },
    (error) => {
      dispatch({
        type: GET_CURRENT_USER_ERROR,
        payload: error.response.data.message,
      });
    },
  );
};

export const setUserAction = (dataUser) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: dataUser,
  });
};

export const unsetUserAction = () => (dispatch) => {
  Cookies.remove('token');
  Cookies.remove('isConnected');
  dispatch({ type: UNSET_USER });
};
