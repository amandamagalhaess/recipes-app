import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

describe('Testa o componente RecommendationCarousel', () => {
  it('Testa se a página de Meals contém os elementos esperados', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });

    await waitFor(() => {
      expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recommendation-card')).toBeInTheDocument();
    });
  });

  it('Testa se a página de Drinks contém os elementos esperados', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks/15997'] });

    await waitFor(() => {
      expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recommendation-card')).toBeInTheDocument();
    });
  });
});
