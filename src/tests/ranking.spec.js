import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  localStorage.setItem('ranking', JSON.stringify([{name: 'ronaldo', picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e", score: 30 }]));
})

describe('Teste Pagina de Ranking', () => {
  test('Deve redirecionar para a página de login quando clicado', () => {
    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@teste.com',
        score: 0,
        assertions: 2,
      },
    };
    
    const { history } = renderWithRouterAndRedux(<App />, initialState, '/ranking');

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking'); 

    const buttonPlayAgain = screen.getByRole('button', {
      name: /Go to home/i,
    });
    
    expect(buttonPlayAgain).toBeInTheDocument();

    userEvent.click(buttonPlayAgain);
    
    const buttonPlay = screen.getByTestId(/btn-play/i);
    const buttonSettings = screen.getByTestId(/btn-settings/i);
    
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonSettings).toBeInTheDocument(); 
  });

  test('Renderiza imagem na tela de Ranking', () => {
    const initialState = {
      player: {
        name: 'teste',
        gravatarEmail: 'teste@test.com',
        score: 0,
        assertions: 2,
      },
    };
    
    renderWithRouterAndRedux(<App />, initialState, '/ranking');

    const img = screen.getByRole('img', {
      name: /foto do player ronaldo/i
    })
    expect(img).toBeInTheDocument();

    const namePlayer = screen.getByRole('heading', {
      name: /ronaldo/i
    })
    expect(namePlayer).toBeInTheDocument();
    const score = screen.getByText(/score:30/i)
    expect(score).toBeInTheDocument();
  });

})
