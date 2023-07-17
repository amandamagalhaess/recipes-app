import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa a página de detalhes de uma receita em progresso', () => {
  const startRecipeButton = screen.getByTestId('start-recipe-btn');
  const recipePhotoLint = screen.getByTestId('recipe-photo');
  beforeEach(() => {
    localStorage.clear();
  });
  it('Testa se a página contém os elementos esperados', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/53060'] });

    const startRecipeBtn = startRecipeButton;
    userEvent.click(startRecipeBtn);

    await waitFor(() => {
      const recipePhoto = recipePhotoLint;
      const recipeTitle = screen.getByTestId('recipe-title');
      const shareBtn = screen.getByTestId('share-btn');
      const favoriteBtn = screen.getByTestId('favorite-btn');
      const recipeCategory = screen.getByTestId('recipe-category');
      const recipeInstructions = screen.getByTestId('instructions');
      const recipeIngredients = screen.getAllByTestId(/ingredient/i);
      const recipeVideo = screen.getByTestId('video');

      expect(recipePhoto).toBeInTheDocument();
      expect(recipeTitle).toBeInTheDocument();
      expect(shareBtn).toBeInTheDocument();
      expect(favoriteBtn).toBeInTheDocument();
      expect(recipeCategory).toBeInTheDocument();
      expect(recipeInstructions).toBeInTheDocument();
      expect(recipeIngredients).toHaveLength(6);
      expect(recipeVideo).toBeInTheDocument();
    });
  });
  it('Testa o funcionamento dos checkboxes em Meals e se eles estão sendo salvos no localstorage', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/53060'] });

    const startRecipeBtn = startRecipeButton;
    userEvent.click(startRecipeBtn);

    await waitFor(() => {
      const recipePhoto = recipePhotoLint;
      expect(recipePhoto).toBeInTheDocument();
    });
    await act(async () => {
      const recipeIngredients = screen.getAllByTestId(/ingredient/i);
      const firstIngredient = recipeIngredients[0];
      const secondIngredient = recipeIngredients[1];
      const thirdIngredient = recipeIngredients[2];
      const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
      expect(finishRecipeBtn).toBeInTheDocument();

      expect(firstIngredient).toBeInTheDocument();
      expect(secondIngredient).toBeInTheDocument();
      expect(thirdIngredient).toBeInTheDocument();

      userEvent.click(firstIngredient);

      const inProgressRecipes1 = JSON.parse(localStorage.getItem('inProgressRecipes'));
      expect(inProgressRecipes1).toEqual({
        drinks: {},
        meals: {
          53060: ['Filo Pastry'],
        },
      });

      expect(finishRecipeBtn).toBeDisabled();
      userEvent.click(firstIngredient);
      const inProgressRecipes2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
      expect(inProgressRecipes2).toEqual({
        drinks: {},
        meals: {
          53060: [],
        },
      });
      // clicar em todos os botões de ingredientes
      userEvent.click(recipeIngredients[0]);
      userEvent.click(recipeIngredients[1]);
      userEvent.click(recipeIngredients[2]);
      userEvent.click(recipeIngredients[3]);
      userEvent.click(recipeIngredients[4]);
      userEvent.click(recipeIngredients[5]);

      expect(finishRecipeBtn).not.toBeDisabled();
    });

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(inProgressRecipes).toEqual({
      drinks: {},
      meals: {
        53060: ['Filo Pastry', 'Minced Beef', 'Onion', 'Oil', 'Salt', 'Pepper'],
      },
    });
  });
  it('Testa o funcionamento dos checkboxes em Drinks e se eles estão sendo salvos no localstorage', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });
    const gilger = 'Ginger ale';
    const startRecipeBtn = startRecipeButton;
    userEvent.click(startRecipeBtn);

    await waitFor(() => {
      const recipePhoto = recipePhotoLint;
      expect(recipePhoto).toBeInTheDocument();
    });
    await act(async () => {
      const recipeIngredients = screen.getAllByTestId(/ingredient/i);
      const firstIngredient = recipeIngredients[0];
      const secondIngredient = recipeIngredients[1];
      const thirdIngredient = recipeIngredients[2];

      const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
      expect(firstIngredient).toBeInTheDocument();
      expect(secondIngredient).toBeInTheDocument();
      expect(thirdIngredient).toBeInTheDocument();
      expect(finishRecipeBtn).toBeInTheDocument();

      expect(finishRecipeBtn).toBeDisabled();

      userEvent.click(firstIngredient);
      userEvent.click(secondIngredient);
      userEvent.click(thirdIngredient);

      const inProgressRecipes1 = JSON.parse(localStorage.getItem('inProgressRecipes'));

      expect(inProgressRecipes1).toEqual({
        drinks: {
          15997: ['Galliano', gilger, 'Ice'],
        },
        meals: {},
      });
      userEvent.click(thirdIngredient);

      const inProgressRecipes2 = JSON.parse(localStorage.getItem('inProgressRecipes'));

      expect(inProgressRecipes2).toEqual({
        drinks: {
          15997: ['Galliano', gilger],
        },
        meals: {},
      });

      userEvent.click(thirdIngredient);

      expect(finishRecipeBtn).not.toBeDisabled();

      userEvent.click(finishRecipeBtn);

      expect(history.location.pathname).toBe('/done-recipes');
    });

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    expect(inProgressRecipes).toEqual({
      drinks: {
        15997: ['Galliano', gilger, 'Ice'],
      },
      meals: {},
    });
  });

  it('Testa se ao clicar no botão de compartilhar um drink a url é copiada', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997/in-progress'] });
    await waitFor(async () => {
      const shareBtn = screen.getByTestId('share-btn');
      expect(shareBtn).toBeInTheDocument();
      const clipboardText = 'http://localhost:3000/drinks/15997';
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
  });
  it('Testa se o botão de favoritar funciona', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997/in-progress'] });
    await waitFor(async () => {
      const favoriteBtn = screen.getByTestId('favorite-btn');
      expect(favoriteBtn).toBeInTheDocument();

      userEvent.click(favoriteBtn);
    });
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favoriteRecipes).toEqual([{ id: '15997', type: 'drink', nationality: '', category: 'Ordinary Drink', alcoholicOrNot: 'Optional alcohol', name: 'GG', image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' }]);
  });
});
