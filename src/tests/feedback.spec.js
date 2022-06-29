import React from 'react';
import { screen } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste Pagina de Feedback', () => {
  test('Verifica se o botão "Play Again" renderiza corretamente', () => {
    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 3,
      },
    };

    const { history } =  renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const { pathname } = history.location;
    expect(pathname).toBe('/feedback'); 
    
    const buttonPlayAgain = screen.getByRole("button", { name: /Play Again/i }); 
    
    expect(buttonPlayAgain).toBeInTheDocument(); 
    expect(buttonPlayAgain).not.toBeDisabled();
    
    userEvent.click(buttonPlayAgain);
    
    expect(history.location.pathname).toBe('/'); 
  });

  test('Verifica se o botão Ranking renderiza corretamente', () => {
    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 3,
      },
    };

    const { history } =  renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const buttonRanking= screen.getByTestId('btn-ranking');
    
    expect(buttonRanking).toBeInTheDocument(); 
    expect(buttonRanking).not.toBeDisabled();
    
    userEvent.click(buttonRanking);
    
    expect(history.location.pathname).toBe('/ranking');

    const buttonPlayAgain= screen.getByRole("button", {name: /go to home/i}); 
    
    expect(buttonPlayAgain).toBeInTheDocument(); 
  });

  test('Verifique se os elementos são renderizados corretamente', async () => {
    renderWithRouterAndRedux(<Feedback />);

    const img = await screen.findByAltText('user');
    await expect(img).toBeInTheDocument();

    const playerName = await screen.findByTestId('header-player-name');
    expect(playerName).toBeInTheDocument();

    const messages = screen.getByRole('heading', { name: /Could be better.../i, level: 2 });
    expect(messages).toBeInTheDocument();

    /* const messages2 = await screen.findByRole('heading', { name: /Feedback Page/i, level: 2 });
    expect(messages2).toBeInTheDocument(); */

    const score = screen.getByTestId(/feedback-total-score/i);
    expect(score).toBeInTheDocument();

    const question = screen.getByTestId(/feedback-total-question/i);
    expect(question).toBeInTheDocument();
  });

  test('Renderiza "Could be better..." quando acerta menos de três perguntas', () => {
    const initialState = {
      player: {
        name: 'pedro',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 1,
      },
    };

    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const feedbackMessage = screen.getByRole('heading', {
      name: /Could be better.../i,
      level: 2,
    });
    
    expect(feedbackMessage).toBeInTheDocument();
  });

  test('Renderiza "Well Done" quando acerta menos de três perguntas', async () => {
    const initialState = {
      player: {
        name: 'pedro',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 3,
      },
    };

    renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const feedbackMessage = screen.getByRole('heading', {
      name: 'Well Done!',
      level: 2,
    });
    
    expect(feedbackMessage).toBeInTheDocument();
  });
});
