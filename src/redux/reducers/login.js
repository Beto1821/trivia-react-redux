import { RECORD_USER_DATA, SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  userName: '',
  userEmail: '',
  userToken: {
    token: '',
  },
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECORD_USER_DATA:
    return { ...state, ...action.userData };
  case SAVE_TOKEN:
    return { ...state, userToken: action.userToken };
  default:
    return state;
  }
};

export default login;
