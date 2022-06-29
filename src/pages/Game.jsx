import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';

class Game extends React.Component {
  state = {
    questions: [{ incorrect_answers: [], category: '', questions: [] }],
    index: 0,
    time: 30,
    timeId: '',
    randomArray: [],
  };

  async componentDidMount() {
    const { token, history } = this.props;
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
    const timeId = setInterval(this.countdown, +'1000');
    this.setState({ timeId });
    const randomArray = this.shuffleAnswers();
    this.setState({ randomArray });
  }

  checkAnswer = () => {
    const { questions, index } = this.state;
    const buttons = document.querySelectorAll('.btnAnswer');
    buttons.forEach((button) => {
      if (button.textContent === questions[index].correct_answer) {
        button.style = 'border: 3px solid rgb(6, 240, 15)';
      } else {
        button.style = 'border: 3px solid red';
      }
    });
  }

  disableButtons = () => {
    const buttons = document.querySelectorAll('.btnAnswer');
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }

  shuffleAnswers = () => {
    const { questions, index } = this.state;
    const array = questions[index].incorrect_answers.map((answer, i) => (
      <button
        key={ i }
        className="btnAnswer"
        data-testid={ `wrong-answer-${i}` }
        type="button"
        onClick={ this.checkAnswer }
      >
        { answer }
      </button>
    ));

    array.push(
      <button
        type="button"
        key="4"
        data-testid="correct-answer"
        className="btnAnswer"
        onClick={ this.checkAnswer }
      >
        {questions[index].correct_answer}
      </button>,
    );
    const shuffled = array.sort(() => (Math.random() - +'0.5'));
    return shuffled;
  }

  countdown = () => {
    const { time, timeId } = this.state;
    if (time === +'0') {
      clearInterval(timeId);
      this.checkAnswer();
      this.disableButtons();
    } else {
      this.setState((prev) => ({
        time: prev.time - 1,
      }));
    }
  }

  render() {
    const { gravatarEmail, score, name } = this.props;
    const { questions, index, time, randomArray } = this.state;
    const hashEmail = md5(gravatarEmail.trim().toLowerCase()).toString();
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
          <div>
            <h2>Temporizador</h2>
            <p>{time}</p>
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
