import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa a página DoneRecipes', () => {
  it('Testa se a página contém os elementos esperados', () => {
    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    const filterByAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterByFoodBtn = screen.getByTestId('filter-by-meal-btn');
    const filterByDrinkBtn = screen.getByTestId('filter-by-drink-btn');

    expect(filterByAllBtn).toBeInTheDocument();
    expect(filterByFoodBtn).toBeInTheDocument();
    expect(filterByDrinkBtn).toBeInTheDocument();
  });

  it('Testa se a página contém as receitas feitas', () => {
    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: '52977',
        type: 'meal',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        doneDate: '2023-07-13T18:05:19.646Z',
        tags: ['Pasta', 'Curry'],
      },
      {
        id: '178319',
        type: 'drink',
        area: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '2023-07-13T18:05:19.646Z',
        tags: [],
      },
    ]));

    renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    const image = screen.getAllByTestId(/-horizontal-image/i);
    const topText = screen.getAllByTestId(/-horizontal-top-text/i);
    const name = screen.getAllByTestId(/-horizontal-name/i);
    const doneDate = screen.getAllByTestId(/-horizontal-done-date/i);
    const shareBtn = screen.getAllByTestId(/-horizontal-share-btn/i);

    expect(image).toHaveLength(2);
    expect(topText).toHaveLength(2);
    expect(name).toHaveLength(2);
    expect(doneDate).toHaveLength(2);
    expect(shareBtn).toHaveLength(2);
  });
});
