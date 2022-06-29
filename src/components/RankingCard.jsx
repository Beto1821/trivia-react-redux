import React from 'react';
import PropTypes from 'prop-types';

class RankingCard extends React.Component {
  render() {
    const { player, index } = this.props;
    const { name, picture, score } = player;
    return (
      <div>
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
