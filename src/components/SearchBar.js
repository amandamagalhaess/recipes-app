import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinks, fetchMeals } from '../service/FetchAPI';

function SearchBar() {
  const location = useLocation();

  const {
    searchOptions,
    setSearchOptions,
    searchText,
    setSearchText,
    setMeals,
    setDrinks,
  } = useContext(RecipesContext);

  const handleSearchButton = async () => {
    if (location.pathname === '/meals') {
      const meals = await fetchMeals(searchOptions, searchText);
      setMeals(meals);
    } else if (location.pathname === '/drinks') {
      const drinks = await fetchDrinks(searchOptions, searchText);
      setDrinks(drinks);
    }
  };

  return (
    <div data-testid="search-content" style={ { display: 'none' } }>
      <input
        type="text"
        data-testid="search-input"
        placeholder="Buscar Receita"
        onChange={ (e) => setSearchText(e.target.value) }
      />
      <br />
      <label>
        <input
          type="radio"
          name="search"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ (e) => setSearchOptions(e.target.value) }
        />
        Ingredient
      </label>
      <label>
        <input
          type="radio"
          name="search"
          value="name"
          data-testid="name-search-radio"
          onChange={ (e) => setSearchOptions(e.target.value) }
        />
        Name
      </label>
      <label>
        <input
          type="radio"
          name="search"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ (e) => setSearchOptions(e.target.value) }
        />
        First Letter
      </label>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearchButton }
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
