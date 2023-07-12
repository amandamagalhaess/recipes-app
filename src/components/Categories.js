import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsByCategory, fetchAllMeals,
  fetchDrinksByCategory, fetchAllDrinks } from '../service/FetchAPI';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const location = useLocation();
  const { setMeals, setDrinks } = useContext(RecipesContext);
  const magicNumber = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      if (location.pathname === '/drinks') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategories(data.drinks);
      } else {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategories(data.meals);
      }
    };
    fetchCategories();
  }, [location.pathname]);

  const handleCategoryFilter = async (category) => {
    if (location.pathname === '/drinks') {
      if (category === selectedCategory) {
        const allDrinks = await fetchAllDrinks();
        setDrinks(allDrinks);
        setSelectedCategory('');
      } else {
        const filteredDrinks = await fetchDrinksByCategory(category);
        setDrinks(filteredDrinks);
        setSelectedCategory(category);
      }
    } else if (category === selectedCategory) {
      const allMeals = await fetchAllMeals();
      setMeals(allMeals);
      setSelectedCategory('');
    } else {
      const filteredMeals = await fetchMealsByCategory(category);
      setMeals(filteredMeals);
      setSelectedCategory(category);
    }
  };

  const handleAllButton = async () => {
    if (location.pathname === '/drinks') {
      const allDrinks = await fetchAllDrinks();
      setDrinks(allDrinks);
    } else {
      const allMeals = await fetchAllMeals();
      setMeals(allMeals);
    }
  };

  return (
    <div>
      {categories && categories.slice(0, magicNumber).map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          onClick={ () => handleCategoryFilter(category.strCategory) }
          data-testid={ `${category.strCategory}-category-filter` }
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

export default Categories;
