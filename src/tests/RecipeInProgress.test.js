import { screen, waitFor } from '@testing-library/react';
import { renderWithRouter } from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a tela de Receitas em progresso', () => {
  it('Testa se a tela contém os elementos corretos', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977/in-progress'] });

    await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());

    const recipeImage = screen.getByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const ingredients = screen.getAllByTestId(/ingredient/i);
    expect(ingredients.length).toBe(13);

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
  });

  it('Testa se a tela contém os elementos corretos', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997/in-progress'] });

    await waitFor(() => expect(screen.getByTestId('recipe-title')).toBeInTheDocument());

    const recipeImage = screen.getByTestId('recipe-photo');
    expect(recipeImage).toBeInTheDocument();

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const ingredients = screen.getAllByTestId(/ingredient/i);
    expect(ingredients.length).toBe(3);

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const finishRecipeBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishRecipeBtn).toBeInTheDocument();
  });
});
