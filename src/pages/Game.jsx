import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { updateScore } from '../redux/actions';

class Game extends React.Component {
  state = {
    questions: [{ incorrect_answers: [], category: '', questions: [] }],
    index: 0,
    time: 30,
    timeId: '',
    randomArray: [],
    showNextBtn: false,
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
    const timeId = setInterval(this.countdown, +'1000');
    this.setState({ timeId });
    const randomArray = this.shuffleAnswers();
    this.setState({ randomArray });
  }

  paintBorder = () => {
    const { questions, index } = this.state;
    const buttons = document.querySelectorAll('.btnAnswer');
    buttons.forEach((button) => {
      if (button.textContent === questions[index].correct_answer) {
        button.style = 'border: 3px solid rgb(6, 240, 15)';
      } else {
        button.style = 'border: 3px solid red';
      }
      button.disabled = true;
    });
  }

  removeBorder = () => {
    const buttons = document.querySelectorAll('.btnAnswer');
    buttons.forEach((button) => {
      button.style = '';
      button.disabled = false;
    });
  }

  checkAnswer = ({ target: { textContent } }) => {
    const { questions, index, time, timeId } = this.state;
    const { dispatch } = this.props;
    const multiplier = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (textContent === questions[index].correct_answer) {
      dispatch(updateScore(
        +'10' + (time * multiplier[questions[index].difficulty]),
      ));
    }
    this.paintBorder();
    this.setState({ showNextBtn: true });
    clearInterval(timeId);
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
      this.paintBorder();
      this.setState({ showNextBtn: true });
    } else {
      this.setState((prev) => ({
        time: prev.time - 1,
      }));
    }
  }

  nextQuestion = () => {
    const { history } = this.props;
    const { index } = this.state;
    if (index === +'4') {
      history.push('/feedback');
    } else {
      this.setState((prev) => ({
        index: prev.index + 1,
        time: 30,
      }), () => {
        const timeId = setInterval(this.countdown, +'1000');
        const randomArray = this.shuffleAnswers();
        this.setState({ randomArray, timeId, showNextBtn: false });
      });
    }

    this.removeBorder();
  }

  render() {
    const { gravatarEmail, score, name } = this.props;
    const { questions, index, time, randomArray, showNextBtn } = this.state;
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
            <p data-testid="timer-count">{time}</p>
          </div>
          <div>
            { showNextBtn && (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ this.nextQuestion }
              >
                Next
              </button>
            )}
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Game);
