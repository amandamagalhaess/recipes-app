import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Meals() {
  const { meals } = useContext(RecipesContext);
  const limit = 12;

  return (
    <div>
      <Header />
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
    </div>
  );
}

export default Meals;
