import React, { useContext, useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import MealsCategorys from '../components/MealsCategorys';

function Meals() {
  const { meals } = useContext(RecipesContext);
  const limit = 12;

  const [filterMeals, setFilterMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (selectedCategory === '') {
      setFilterMeals(meals);
    } else {
      const filter = meals.filter((meal) => meal.strCategory === selectedCategory);
      setFilterMeals(filter);
    }
  }, [meals, selectedCategory]);

  const categoryFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header />
      <MealsCategorys categoryFilter={ categoryFilter } />
      {
        filterMeals && filterMeals.length > 0 && filterMeals
          .slice(0, limit).map((meal, index) => (
            <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
            </div>
          ))
      }
      <Footer />
    </div>
  );
}

export default Meals;
