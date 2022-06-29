import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  componentDidMount() {
    const { name, score, gravatarEmail } = this.props;
    const picture = `https://www.gravatar.com/avatar/${md5(gravatarEmail.trim().toLowerCase()).toString()}`;
    const ranking = localStorage.getItem('ranking');
    if (ranking) {
      localStorage.setItem('ranking',
        JSON.stringify([...JSON.parse(ranking), { name, score, picture }]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([{ name, score, picture }]));
    }
  }

  render() {
    const { name, score, gravatarEmail } = this.props;
    const hashEmail = md5(gravatarEmail.trim().toLowerCase()).toString();

    return (
      <div>
        <h1 data-testid="feedback-text">Feedback Page</h1>
        <img
          src={ `https://www.gravatar.com/avatar/${hashEmail}` }
          alt="user"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name}</p>
        <p data-testid="header-score">{score}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.login.userName,
  score: state.player.score,
  gravatarEmail: state.login.userEmail,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
