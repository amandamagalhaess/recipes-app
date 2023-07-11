import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';
import Header from '../components/Header';

describe('Testa o componente Header', () => {
  it('Testa se o componente Header funciona como esperado na página de Meals', () => {
    const { history } = renderWithRouter(<Header />, { initialEntries: ['/meals'] });

    const mealsPageTitle = screen.getByTestId('page-title');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    const profileTopBtn = screen.getByTestId('profile-top-btn');

    expect(mealsPageTitle).toBeInTheDocument();
    expect(mealsPageTitle.innerHTML).toBe('Meals');
    expect(searchTopBtn).toBeInTheDocument();
    expect(profileTopBtn).toBeInTheDocument();

    userEvent.click(profileTopBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  it('Testa se o componente Header renderiza na página de Drinks', () => {
    renderWithRouter(<Header />, { initialEntries: ['/drinks'] });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Drinks')).toBeInTheDocument();
  });

  it('Testa se o componente Header renderiza na página de Done Recipes', () => {
    renderWithRouter(<Header />, { initialEntries: ['/done-recipes'] });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });

  it('Testa se o componente Header renderiza na página de Favorite Recipes', () => {
    renderWithRouter(<Header />, { initialEntries: ['/favorite-recipes'] });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Favorite Recipes')).toBeInTheDocument();
  });

  it('Testa se o componente Header renderiza na página de Profile', () => {
    renderWithRouter(<Header />, { initialEntries: ['/profile'] });

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('Testa se o título do Header é vazio em uma rota inexistente', () => {
    renderWithRouter(<Header />, { initialEntries: ['/rota-inexistente'] });

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle.innerHTML).toBe('');
  });

  it('Testa se o botão de busca funciona como esperado', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId('search-top-btn');
    const searchInput = screen.getByTestId('search-input');
    const searchContent = screen.getByTestId('search-content');

    expect(searchInput).toBeInTheDocument();
    expect(searchContent).toHaveStyle('display: none');

    userEvent.click(searchTopBtn);
    expect(searchContent).toHaveStyle('display: block');

    userEvent.click(searchTopBtn);
    expect(searchContent).toHaveStyle('display: none');
  });
});
