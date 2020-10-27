import {
  GET_CHATS_SUCESS,
  GET_CHATS_ERROR,
} from '../types/chatTypes';

const initialState = {
  allChannels: [],
  errorChannel: null,
  messageErrorChannel: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHATS_SUCESS:
      return {
        ...state,
        allChannels: action.payload,
        errorChannel: false,
      };
    case GET_CHATS_ERROR:
      return {
        ...state,
        messageErrorChannel: action.payload,
        errorChannel: true,
      };
    default:
      return state;
  }
};

export default reducer;
