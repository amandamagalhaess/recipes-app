import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinksByCategory, fetchAllDrinks } from '../service/FetchAPI';

export default function DrinksCategorys() {
  const [categories, setCategories] = useState([]);
  const { setDrinks } = useContext(RecipesContext);
  const magicNumber = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.drinks);
    };

    fetchCategories();
  }, []);

  const handleCategoryFilter = async (category) => {
    setDrinks([]);
    const filteredDrinks = await fetchDrinksByCategory(category);
    setDrinks(filteredDrinks);
  };

  const handleAllButton = async () => {
    setDrinks([]);
    const allDrinks = await fetchAllDrinks();
    setDrinks(allDrinks);
  };

  return (
    <div>
      {categories && categories.slice(0, magicNumber).map((category) => (

        <button
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          type="button"
          onClick={ () => handleCategoryFilter(category.strCategory) }
        >
          {category.strCategory}

        </button>

      ))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ handleAllButton }
      >
        All
      </button>
    </div>
  );
}
