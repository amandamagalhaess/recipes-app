import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import { fetchMealsByCategory, fetchAllMeals } from '../service/FetchAPI';

export default function MealsCategorys() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { setMeals } = useContext(RecipesContext);
  const magicNumber = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.meals);
    };

    fetchCategories();
  }, []);

  const handleCategoryFilter = async (category) => {
    if (category === selectedCategory) {
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
    const allMeals = await fetchAllMeals();
    setMeals(allMeals);
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
