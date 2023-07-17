import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouter } from './helpers/renderWithRouter';

const searchID = 'search-top-btn';
const searchInputID = 'search-input';
const searchRadioName = 'name-search-radio';
const searchButtonID = 'exec-search-btn';

describe('Testa o componente Search Bar', () => {
  it('Testa se é possivel fazer a busca na página de Meals', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(searchID);
    userEvent.click(searchTopBtn);

    const textInput = screen.getByTestId(searchInputID);
    userEvent.type(textInput, 'a');

    const radioFirstLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(radioFirstLetter);

    const btnSearch = screen.getByTestId(searchButtonID);
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument());

    const recipeName = screen.getByTestId('0-card-name');
    expect(recipeName).toBeInTheDocument();
    // expect(recipeName.innerHTML).toBe('Apple Frangipan Tart');
  });

  it('Testa se é possivel fazer a busca na página de Drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(searchID);
    userEvent.click(searchTopBtn);

    const textInput = screen.getByTestId(searchInputID);
    userEvent.type(textInput, 'lemon');

    const radioIngredient = screen.getByTestId('ingredient-search-radio');
    userEvent.click(radioIngredient);

    const btnSearch = screen.getByTestId(searchButtonID);
    userEvent.click(btnSearch);

    await waitFor(() => expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument());

    const recipeName = screen.getByTestId('0-card-name');
    expect(recipeName).toBeInTheDocument();
    // expect(recipeName.innerHTML).toBe('A True Amaretto Sour');
  });

  it('Testa se quando a API retornar apenas uma receita na página de Meals o usuário é redirecionado para a tela de detalhes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(searchID);
    userEvent.click(searchTopBtn);

    const textInput = screen.getByTestId(searchInputID);
    userEvent.type(textInput, 'Apple Frangipan Tart');

    const radioName = screen.getByTestId(searchRadioName);
    userEvent.click(radioName);

    const btnSearch = screen.getByTestId(searchButtonID);
    userEvent.click(btnSearch);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/meals/52768');
    });
  });

  it('Testa se quando a API retornar apenas uma receita na página de Drinks o usuário é redirecionado para a tela de detalhes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(searchID);
    userEvent.click(searchTopBtn);

    const textInput = screen.getByTestId(searchInputID);
    userEvent.type(textInput, 'A True Amaretto Sour');

    const radioName = screen.getByTestId(searchRadioName);
    userEvent.click(radioName);

    const btnSearch = screen.getByTestId(searchButtonID);
    userEvent.click(btnSearch);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/drinks/17005');
    });
  });

  it('Testa se quando não retornar nenhuma receita na página Meals o usuário é alertado', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchTopBtn = screen.getByTestId(searchID);
    userEvent.click(searchTopBtn);

    const textInput = screen.getByTestId(searchInputID);
    userEvent.type(textInput, 'blablabla');

    const radioName = screen.getByTestId(searchRadioName);
    userEvent.click(radioName);

    const btnSearch = screen.getByTestId(searchButtonID);
    userEvent.click(btnSearch);

    await waitFor(() => {
      const alertSpy = jest.spyOn(global, 'alert');
      expect(alertSpy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      alertSpy.mockRestore();
    });
  });

  it('Testa se quando não retornar nenhuma receita na página Drinks o usuário é alertado', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchTopBtn = screen.getByTestId(searchID);
    userEvent.click(searchTopBtn);

    const textInput = screen.getByTestId(searchInputID);
    userEvent.type(textInput, 'blablabla');

    const radioName = screen.getByTestId(searchRadioName);
    userEvent.click(radioName);

    const btnSearch = screen.getByTestId(searchButtonID);
    userEvent.click(btnSearch);

    await waitFor(() => {
      const alertSpy = jest.spyOn(global, 'alert');
      expect(alertSpy).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
      alertSpy.mockRestore();
    });
  });
});
