import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  render() {
    const { name, score, gravatarEmail, rightAnswers } = this.props;
    const hashEmail = md5(gravatarEmail.trim().toLowerCase()).toString();

    return (
      <div>
        <h1>Feedback Page</h1>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
        <h2 data-testid="feedback-text">
          {rightAnswers < +'3' ? 'Could be better...' : 'Well Done!'}
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.userName,
  score: state.player.score,
  gravatarEmail: state.login.userEmail,
  rightAnswers: state.player.rightAnswers,
});

Feedback.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  rightAnswers: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
