import React from 'react';
import App from '../../App';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('teste página de login', () => {
  test('Verifica se o login renderiza corretamente', () => {
   renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    const buttonPlay = screen.getByTestId(/btn-play/i); 
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toBeDisabled();
    const buttonSettings = screen.getByTestId(/btn-settings/i); 
    expect(buttonSettings).toBeInTheDocument();  
  });

  test('Verifica se o botão Play direciona para pagina Game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByTestId('btn-play'); 
    expect(buttonPlay).toBeInTheDocument();

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputName, 'Henrique');
    userEvent.type(inputEmail, 'teste@trybe.com');

    expect(inputName).toHaveValue('Henrique');
    expect(inputEmail).toHaveValue('teste@trybe.com');

    userEvent.click(buttonPlay);
    history.push('/game');     
  });

  test('Verifica se o botão configurações direciona corretamente', () => {
    const { history } =  renderWithRouterAndRedux(<App />);

    const buttonSettings = screen.getByTestId(/btn-settings/i); 
    expect(buttonSettings).toBeInTheDocument();
    userEvent.click(buttonSettings);
    history.push('/settings');     
  });

  test('Verifique se a validação está funcionando', () => {
    renderWithRouterAndRedux(<App />);
 
     const inputName = screen.getByTestId('input-player-name');
     expect(inputName).toBeInTheDocument();
     const inputEmail = screen.getByTestId('input-gravatar-email');
     expect(inputEmail).toBeInTheDocument();
 
     const buttonPlay = screen.getByTestId(/btn-play/i); 
     expect(buttonPlay).toBeInTheDocument();
     expect(buttonPlay).toBeDisabled();
 
     userEvent.type(inputName, 'Henrique');
     userEvent.type(inputEmail, 'teste@trybe.com');
 
     expect(buttonPlay).not.toBeDisabled();
         
   });

   test('Verifique se a validação está funcionando - inputName certo', () => {
    renderWithRouterAndRedux(<App />);
 
     const inputName = screen.getByTestId('input-player-name');
     expect(inputName).toBeInTheDocument();
     const inputEmail = screen.getByTestId('input-gravatar-email');
     expect(inputEmail).toBeInTheDocument();
 
     const buttonPlay = screen.getByTestId(/btn-play/i); 
     expect(buttonPlay).toBeDisabled();
 
     userEvent.type(inputName, 'Henrique');
     userEvent.type(inputEmail, 'teste@trybm');
 
     expect(buttonPlay).not.toBeDisabled();     
         
   });

   test('Verifique se a validação está funcionando - ambas erradas', () => {
    renderWithRouterAndRedux(<App />);
 
     const inputName = screen.getByTestId('input-player-name');
     expect(inputName).toBeInTheDocument();
     const inputEmail = screen.getByTestId('input-gravatar-email');
     expect(inputEmail).toBeInTheDocument();
 
     const buttonPlay = screen.getByTestId(/btn-play/i); 
     expect(buttonPlay).toBeInTheDocument();

     expect(buttonPlay).toBeDisabled();

     userEvent.type(inputName, '');
     expect(inputName).toHaveAttribute('value', ''); 
     userEvent.type(inputEmail, 'teste@tryom');
     expect(inputEmail).toHaveAttribute('value', 'teste@tryom');
 
     expect(buttonPlay).toBeDisabled();      
         
   });

   test('Verifique se a validação está funcionando - insira o e-mail certo', () => {
    renderWithRouterAndRedux(<App />);
 
    const inputName = screen.getByTestId('input-player-name');
     expect(inputName).toBeInTheDocument();
     const inputEmail = screen.getByTestId('input-gravatar-email');
     expect(inputEmail).toBeInTheDocument();
 
     const buttonPlay = screen.getByTestId(/btn-play/i); 
     expect(buttonPlay).toBeInTheDocument();

     expect(buttonPlay).toBeDisabled();

     userEvent.type(inputName, '');
     userEvent.type(inputEmail, 'teste@trybe.com');
 
     expect(buttonPlay).toBeDisabled();      
         
   });
});
