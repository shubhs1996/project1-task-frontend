import { AUTHENTICATE, LOGOUT, SIGNUP, SIGNUPERR} from '../actions/auth';

const initialState = {
  token: null,
  user: null,
  authError: null,
  signUpMsg:null,
  signUpErr:null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        user: action.user,
        authError: action.authErr,
        signUpMsg:null,
      };
      case SIGNUP:
        return {
            ...state,
            signUpMsg:action.Msg
        };
      case SIGNUPERR:
        return {
          ...state,
          signUpErr:action.Err
        };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};