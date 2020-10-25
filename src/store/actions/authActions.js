import axios from "axios";
import Cookies from "js-cookie";

import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from "../types/authTypes";

export const loginAction = (user)  => {
  const promise = axios.post("https://unptitfive-server.herokuapp.com/user/login", {
    ...user,
  }, {
    withCredentials: true
  });
  promise.then(
    (res) => {
      Cookies.set("isConnected", true);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.user.token
      });
    },
    (error) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.data.message
      })
    }
  );
}