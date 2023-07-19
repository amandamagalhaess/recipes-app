import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

const recipeTitle = 'recipe-title';
const favoriteButton = 'favorite-btn';

describe('Testa a tela de detalhes', () => {
  it('Testa se ao clicar no botão de compartilhar a url é copiada', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const clipboardText = 'http://localhost:3000/meals/52977';
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        readText: jest.fn().mockResolvedValue(clipboardText),
        writeText: jest.fn().mockResolvedValue(),
      },
      writable: true,
    });

    userEvent.click(shareBtn);

    await expect(navigator.clipboard.readText()).resolves.toBe(clipboardText);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(clipboardText);

    const alert = screen.getByText('Link copied!');
    expect(alert).toBeInTheDocument();
  });

  it('Testa se ao clicar no botão de favoritar a bebida é adicionada ao localStorage', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });

    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const favoriteBtn = screen.getByTestId(favoriteButton);
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual([{ id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Optional alcohol', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' }]);
  });

  it('Testa se ao clicar no botão de favoritar novamente a bebida é retirada do localStorage', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });
    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const favoriteBtn = screen.getByTestId(favoriteButton);
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual([]);
  });

  it('Testa se ao clicar no botão de favoritar a comida é adicionada ao localStorage', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52771'] });

    localStorage.clear();

    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const favoriteBtn = screen.getByTestId(favoriteButton);
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual([{ id: '52771', type: 'meal', nationality: 'Italian', category: 'Vegetarian', alcoholicOrNot: '', name: 'Spicy Arrabiata Penne', image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' }]);
  });

  it('Testa se o botão de start recipe aparece na página', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/53060'] });

    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const startRecipeBtn = screen.getByText('START RECIPE');
    expect(startRecipeBtn).toBeInTheDocument();
  });

  it('Testa se o botão de continue recipe aparece na página depois que a receita é iniciada', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/53060'] });

    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: { 53060: [] } }));

    await waitFor(() => expect(screen.getByTestId(recipeTitle)).toBeInTheDocument());

    const continueRecipeBtn = screen.getByText('CONTINUE RECIPE');
    expect(continueRecipeBtn).toBeInTheDocument();
  });
});
