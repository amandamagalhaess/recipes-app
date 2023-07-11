import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa o componente Search Bar', () => {
  it('Testa se é possivel fazer a busca na página de Meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const textInput = screen.getByTestId('search-input');
    userEvent.type(textInput, 'Arrabiata');

    const radioName = screen.getByTestId('name-search-radio');
    userEvent.click(radioName);

    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument());

    const recipeName = screen.getByTestId('0-card-name');
    expect(recipeName).toBeInTheDocument();
    expect(recipeName.innerHTML).toBe('Spicy Arrabiata Penne');
  });

  it('Testa se é possivel fazer a busca na página de Drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);

    const textInput = screen.getByTestId('search-input');
    userEvent.type(textInput, 'lemon');

    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioIngredient);

    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument());

    const recipeName = screen.getByTestId('0-card-name');
    expect(recipeName).toBeInTheDocument();
    expect(recipeName.innerHTML).toBe('A True Amaretto Sour');
  });
});
