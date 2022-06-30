import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import { screen, waitFor, cleanup } from '@testing-library/react';
import App from '../App';

const MAX_TIMEOUT = 40000;
  describe('Teste do end_to_end', () => {

    jest.setTimeout(MAX_TIMEOUT);
    test('Test between Login to Feedback', async () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId('input-player-name');
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const btnLogin = screen.getByTestId("btn-play");
    
    
    userEvent.type(inputName, 'teste');
    userEvent.type(inputEmail, 'teste@teste.com');
    
    userEvent.click(btnLogin);


    await screen.findByTestId('question-category');
    const buttonTrue = await screen.findByTestId('correct-answer');
    userEvent.click(buttonTrue);

    const buttonNext = await screen.findByTestId('btn-next');
    userEvent.click(buttonNext);
    
      
    await screen.findByText('0', {}, {timeout:31000});
    await waitFor(() => expect(buttonTrue).toBeDisabled(), {timeout:31000});
    
    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next'));     

    userEvent.click(screen.getByTestId('correct-answer'));
    userEvent.click(screen.getByTestId('btn-next')); 
        
  });
  });