import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Game extends React.Component {
  render() {
    const { gravatarEmail, score, name } = this.props;
    const hashEmail = md5(gravatarEmail.trim().toLowerCase()).toString();
    return (
      <div>
        <header>
          <img src={ `https://www.gravatar.com/avatar/${hashEmail}` } alt="user" data-testid="header-profile-picture" />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = ({ player, login }) => ({
  name: login.userName,
  assertions: player.assertions,
  score: player.score,
  gravatarEmail: login.userEmail,
});

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
