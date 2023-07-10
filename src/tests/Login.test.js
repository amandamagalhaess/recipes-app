import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa a tela de Login', () => {
  it('Testa se a tela de Login renderiza como esperado', () => {
    const { history } = renderWithRouter(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const enterButton = screen.getByTestId('login-submit-btn');

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(enterButton).toBeInTheDocument();

    expect(enterButton).toBeDisabled();

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, 'password');

    expect(enterButton).not.toBeDisabled();

    userEvent.click(enterButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
