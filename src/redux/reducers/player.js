import { UPDATE_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  rightAnswers: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      rightAnswers: state.rightAnswers + 1,
    };
  default:
    return state;
  }
};

export default player;
