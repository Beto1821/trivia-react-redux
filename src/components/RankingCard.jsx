import React from 'react';
import PropTypes from 'prop-types';
import './RankingCard.css';

class RankingCard extends React.Component {
  render() {
    const { player, index } = this.props;
    const { name, picture, score } = player;
    return (
      <div className={ `ranking rank${index}` }>
        <img src={ picture } alt={ `foto do player ${name}` } />
        <h3 data-testid={ `player-name-${index}` }>{name}</h3>
        <p data-testid={ `player-score-${index}` }>
          Score:
          { score }
        </p>
      </div>
    );
  }
}

RankingCard.propTypes = {
  player: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingCard;
