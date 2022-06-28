import { RECORD_USER_DATA } from '../actions';

const INITIAL_STATE = {
  userName: '',
  userEmail: '',
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECORD_USER_DATA:
    return { ...state, ...action.userData };
  default:
    return state;
  }
};

export default login;
