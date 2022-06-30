import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, cleanup } from '@testing-library/react';
import App from '../App';
import { response, failedQuestionMock } from '../tests/mocks/requestApi';
import Game from '../pages/Game';
afterEach(() => jest.clearAllMocks());

const MAX_TIMEOUT = 40000;
describe('Teste da Pagina do Jogo', () => {
  beforeEach(cleanup);
  
  test('Verifica se Game renderiza corretamente', async () => {
    response.results[0].correct_answer = 'A crowbar';
    renderWithRouterAndRedux(<Game />);
    const img = await screen.findByAltText('user');
    await expect(img).toBeInTheDocument();

    const playerName = await screen.findByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const buttonTrue = await screen.findByTestId('correct-answer')
    await expect(buttonTrue).toBeInTheDocument();

    const buttonsFalse = await screen.findAllByTestId(/wrong-answer-/i);
    buttonsFalse.forEach((buttons) => {
    expect(buttons).toBeInTheDocument();
    })

    const titleTimer = screen.getByRole('heading', {
      name: /temporizador/i
    })
    expect(titleTimer).toBeInTheDocument();

    const score = screen.getByTestId(/header-score/i);
    expect(score).toBeInTheDocument();

    const timerCount = screen.getByTestId(/timer-count/i);
    expect(timerCount).toBeInTheDocument();
  });

  test('Verifique se o seletor de borda funciona', async () => {
    renderWithRouterAndRedux(<Game />, {}, '/game');
    
    const buttonTrue = await screen.findByTestId('correct-answer')
    await expect(buttonTrue).toBeInTheDocument();

    const buttonsFalse = await screen.findAllByTestId(/wrong-answer-/i)
    buttonsFalse.forEach((button) => expect(button).toBeInTheDocument());
    userEvent.click(buttonTrue);

    await expect(buttonTrue).toHaveAttribute('style', 'border: 3px solid rgb(6, 240, 15);');
    userEvent.click(buttonsFalse[0]);
    await expect(buttonsFalse[0]).toHaveAttribute('style', 'border: 3px solid red;');

    const buttonNext = await screen.findByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument();

    userEvent.click(buttonNext);

    expect(buttonTrue).not.toHaveAttribute();
    await expect(buttonsFalse[0]).not.toHaveAttribute();
  });

  test('Verifica os pontos ao clicar na resposta correta - fácil', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const { store } = renderWithRouterAndRedux(<Game />);

    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    expect(store.getState().player.score).toBe(40);
  });

  test('Verifica os pontos ao clicar na resposta correta - Médio', async () => {
    response.results[0].difficulty = 'medium';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const { store } = renderWithRouterAndRedux(<Game />);

    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    expect(store.getState().player.score).toBe(70);
  });

  test('Verifica os pontos ao clicar na resposta correta - Difícil', async () => {
    response.results[0].difficulty = 'hard';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const { store } = renderWithRouterAndRedux(<Game />);

    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    expect(store.getState().player.score).toBe(100);
  });

  test('Verifica se o token inválido redireciona para a página de login', async () => {
    global.fetch = jest.fn(() => Promise.resolve(({
    json: () => Promise.resolve(failedQuestionMock)
    })))
    
    const { history } = renderWithRouterAndRedux(<App />);
    
    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const btnLogin = screen.getByTestId("btn-play");
    
    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    
    userEvent.click(btnLogin);
    
    await waitFor(() => {
    expect(history.location.pathname).toBe('/')
    }); 
  });

});
