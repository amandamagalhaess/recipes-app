import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa o componente Header', () => {
  it('Testa se o componente Header renderiza como esperado', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

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

    const profilePageTitle = screen.getByTestId('page-title');
    expect(profilePageTitle).toBeInTheDocument();
    expect(profilePageTitle.innerHTML).toBe('Profile');
  });
});
