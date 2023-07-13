import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa a tela de Profile', () => {
  localStorage.setItem('user', JSON.stringify({ email: 'email@email.com' }));

  it('Testa se a tela de Profile renderiza corretamente', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    expect(profileEmail).toHaveTextContent('email@email');

    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    expect(profileDoneBtn).toBeInTheDocument();

    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(profileFavoriteBtn).toBeInTheDocument();

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  it('Testa se o botão de Done Recipes redireciona para a tela correta', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(profileDoneBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });

  it('Testa se o botão de Favorite Recipes redireciona para a tela correta', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(profileFavoriteBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });

  it('Testa se o botão de Logout redireciona para a tela correta e limpa o localStorage', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(profileLogoutBtn);

    expect(localStorage.getItem('user')).toBe(null);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
