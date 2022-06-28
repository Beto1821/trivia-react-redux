import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Game extends React.Component {
  state = {
    questions: [{ incorrect_answers: [], category: '', questions: [] }],
    index: 0,
  };

  async componentDidMount() {
    const { token, history } = this.props;
    // const token = localStorage.getItem('token');
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&token=${token}`,
    );
    const data = await response.json();
    const result = await data;
    if (result.response_code === +'3') {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      this.setState({ questions: result.results });
    }
    console.log(result.results);
  }

  shuffleAnswers = () => {
    const { questions, index } = this.state;
    const array = questions[index].incorrect_answers.map((answer, i) => (
      <button
        key={ i }
        data-testid={ `wrong-answer-${i}` }
        type="button"
      >
        { answer }
      </button>
    ));
    array.push(
      <button
        type="button"
        key="4"
        data-testid="correct-answer"
      >
        {questions[index].correct_answer}
      </button>,
    );
    const shuffled = array.sort(() => (Math.random() - +'0.5'));
    return shuffled;
  }

  render() {
    const { gravatarEmail, score, name } = this.props;
    const { questions, index } = this.state;
    const hashEmail = md5(gravatarEmail.trim().toLowerCase()).toString();
    const randomArray = this.shuffleAnswers();
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${hashEmail}` }
            alt="user"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{score}</p>
        </header>
        <main>
          <h2 data-testid="question-category">{questions[index].category}</h2>
          <p data-testid="question-text">{questions[index].question}</p>
          <div data-testid="answer-options">
            {randomArray}
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = ({ player, login }) => ({
  name: login.userName,
  assertions: player.assertions,
  score: player.score,
  gravatarEmail: login.userEmail,
  token: login.userToken.token,
});

Game.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(Game);
