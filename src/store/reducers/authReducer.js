import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR
} from "../types/authTypes";

const initialState = {
  auth: {},
  errorLogin: null,
  messageErrorLogin: null,
  errorRegister: null,
  messageErrorRegister: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: action.payload,
        errorLogin: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        messageErrorLogin: action.payload,
        errorLogin: true,
      };
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
    default:
      return state;
  }
}