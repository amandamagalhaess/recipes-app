import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

const cardName = '0-card-name';

describe('Testa o componente Categories', () => {
  it('Testa se a página de Meals contém os elementos esperados', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    await waitFor(() => {
      expect(screen.getByTestId('Beef-category-filter')).toBeInTheDocument();
    });

    const breakfastCategory = screen.getByTestId('Breakfast-category-filter');
    userEvent.click(breakfastCategory);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Breakfast Potatoes');
    });

    userEvent.click(screen.getByTestId('Breakfast-category-filter'));

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });

    userEvent.click(screen.getByTestId('All-category-filter'));

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('Corba');
    });
  });

  it('Testa se a página de Drinks contém os elementos esperados', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    await waitFor(() => {
      expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeInTheDocument();
    });

    const cocktailCategory = screen.getByTestId('Cocktail-category-filter');
    userEvent.click(cocktailCategory);

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('155 Belmont');
    });

    userEvent.click(screen.getByTestId('All-category-filter'));

    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });

    userEvent.click(screen.getByTestId('Shake-category-filter'));
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('151 Florida Bushwacker');
    });
    userEvent.click(screen.getByTestId('Shake-category-filter'));
    await waitFor(() => {
      expect(screen.getByTestId(cardName)).toHaveTextContent('GG');
    });
  });
});
