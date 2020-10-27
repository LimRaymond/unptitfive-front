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

const initialState = {
  isLoggedIn: false,
  auth: {},
  currentUser: {},
  errorLogin: null,
  messageErrorLogin: null,
  errorRegister: null,
  messageErrorRegister: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        auth: action.payload,
        errorRegister: false,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        messageErrorRegister: action.payload,
        errorRegister: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        auth: action.payload,
        errorLogin: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        messageErrorLogin: action.payload,
        errorLogin: true,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case GET_CURRENT_USER_ERROR:
      return {
        ...state,
        messageErrorLogin: action.payload,
        errorLogin: true,
      };
    case SET_USER:
      return {
        ...state,
        auth: action.payload,
      };
    case UNSET_USER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
