import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { playAgain } from '../redux/actions';

class Feedback extends React.Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(playAgain);
  }

  render() {
    const { assertions, score, history } = this.props;
    return (
      <div>
        <Header />
        <h2 data-testid="feedback-text">
          {assertions < +'3' ? 'Could be better...' : 'Well Done!'}
        </h2>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedback);
