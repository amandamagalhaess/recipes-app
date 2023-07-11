import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchMeals } from '../service/FetchAPI';

function SearchBar() {
  const {
    searchOptions,
    setSearchOptions,
    searchText,
    setSearchText,
    setMeals,
  } = useContext(RecipesContext);

  const handleSearchButton = async () => {
    const meals = await fetchMeals(searchOptions, searchText);
    setMeals(meals);
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
