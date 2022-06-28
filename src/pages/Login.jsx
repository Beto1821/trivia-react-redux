import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recordUserData, requestToken } from '../redux/actions';

class Login extends React.Component {
  state = {
    userName: '',
    userEmail: '',
    btnDisabled: true,
  };

  validateInput = () => {
    const { userName, userEmail } = this.state;
    if (userName && userEmail) this.setState({ btnDisabled: false });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(() => ({
      [name]: value,
    }), this.validateInput);
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { userName, userEmail } = this.state;
    dispatch(recordUserData({ userName, userEmail }));
    dispatch(requestToken(history));
    // history.push('/game');
  }

  render() {
    const { userName, userEmail, btnDisabled } = this.state;
    const { history } = this.props;
    return (
      <div>
        <form>
          <input
            type="text"
            name="userName"
            value={ userName }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
          <input
            type="text"
            name="userEmail"
            value={ userEmail }
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="btn-play"
            disabled={ btnDisabled }
          >
            Play
          </button>
          <button
            type="button"
            onClick={ () => history.push('/settings') }
            data-testid="btn-settings"
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Login);
