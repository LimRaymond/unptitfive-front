import axios from 'axios';
import Cookies from 'js-cookie';

import {
  GET_CHATS_SUCESS,
  GET_CHATS_ERROR,
} from '../types/chatTypes';

export const getAllChannelsAction = () => (dispatch) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + Cookies.get('token'),
    },
  };
  const promise = axios.get('https://unptitfive-server.herokuapp.com/channel', config);
  promise.then(
    (res) => {
      dispatch({
        type: GET_CHATS_SUCESS,
        payload: res.data,
      });
    },
    (error) => {
      dispatch({
        type: GET_CHATS_SUCESS,
        payload: error.response.data.message,
      });
    },
  );
};
