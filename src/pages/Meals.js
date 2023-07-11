import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import MealsCategorys from '../components/MealsCategorys';

function Meals() {
  const { meals } = useContext(RecipesContext);
  const limit = 12;

  return (
    <div>
      <Header />
      <MealsCategorys />
      {
        meals && meals.length > 0 && meals.slice(0, limit).map((meal, index) => (
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
