import { UPDATE_SCORE, PLAY_AGAIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case PLAY_AGAIN:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default player;
