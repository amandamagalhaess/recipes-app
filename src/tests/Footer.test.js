import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa o componente Footer', () => {
  it('Testa se o componente Footer renderiza na página de Meals', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const footer = screen.getByTestId('footer');
    const mealsBottomBtn = screen.getByTestId('meals-bottom-btn');
    const drinksBottomBtn = screen.getByTestId('drinks-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(mealsBottomBtn).toBeInTheDocument();
    expect(drinksBottomBtn).toBeInTheDocument();
  });

  it('Testa se o componente Footer renderiza na página de Drinks', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const footer = screen.getByTestId('footer');
    const mealsBottomBtn = screen.getByTestId('meals-bottom-btn');
    const drinksBottomBtn = screen.getByTestId('drinks-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(mealsBottomBtn).toBeInTheDocument();
    expect(drinksBottomBtn).toBeInTheDocument();
  });
});
