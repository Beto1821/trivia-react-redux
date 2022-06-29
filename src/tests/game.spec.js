import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import Game from '../pages/Game';
import { response } from '../tests/mocks/requestApi';
afterEach(() => jest.clearAllMocks());

describe('Teste da Pagina do Jogo', () => {
  test('Verifica se Game renderiza corretamente', async () => {
    response.results[0].correct_answer = 'A crowbar';
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game')
    const { pathname } = history.location;
    expect(pathname).toBe('/game'); 
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
    const { history } = renderWithRouterAndRedux(<Game />);
    
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

  test('Verifique se o botão Próximo redireciona para Feedback após a última pergunta', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game')

    const buttonTrue = await screen.findByTestId('correct-answer')
    await expect(buttonTrue).toBeInTheDocument();
    userEvent.click(buttonTrue);

    const buttonNext = await screen.findByTestId(/btn-next/i);
    userEvent.click(buttonNext);

    history.push('/feedback') 

    const namePlayer = screen.getByRole('heading', {
      name: /feedback page/i
    });
    expect(namePlayer).toBeInTheDocument;

  });

  test('Verifica os pontos ao clicar na resposta correta - fácil', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(response),
      })
    );

    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<Game />, initialState, '/game');

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

    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<Game />, initialState, '/game');

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

    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 0,
      },
    };

    const { store } = renderWithRouterAndRedux(<Game />, initialState, '/game');

    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    expect(store.getState().player.score).toBe(100);
  });
});
