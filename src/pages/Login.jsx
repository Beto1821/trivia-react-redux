import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { recordUserData } from '../store/actions';

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
    this.setState({
      [name]: value,
    });
    this.validateInput();
  };

  handleClick = () => {
    const { dispatch } = this.props;
    const { userName, userEmail } = this.state;
    dispatch(recordUserData({ userName, userEmail }));
    // history push
  }

  render() {
    const { userName, userEmail, btnDisabled } = this.state;
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
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
