import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RankingCard from '../components/RankingCard';
import { playAgain } from '../redux/actions';

class Ranking extends React.Component {
  playAgain = () => {
    const { history, dispatch } = this.props;
    history.push('/');
    dispatch(playAgain);
  }

  render() {
    const players = JSON.parse(localStorage.getItem('ranking'));
    const sortedPlayers = players.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking page</h1>
        {sortedPlayers.map((player, index) => (
          <RankingCard key={ index } player={ player } index={ index } />
        ))}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.playAgain }
        >
          Go to home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
