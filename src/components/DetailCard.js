import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function DetailCard({ recipe, ingredients, measures }) {
  const location = useLocation();

  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</p>
      {
        location.pathname.includes('meals') ? (
          <p data-testid="recipe-category">{recipe.strCategory}</p>
        ) : (
          <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
        )
      }
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient[1]} - ${measures[index][1]}`}
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {
        location.pathname.includes('meals') && recipe.strYoutube && (
          <iframe
            title="video"
            data-testid="video"
            width="320"
            height="240"
            src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
          />
        )
      }
    </div>
  );
}

DetailCard.propTypes = {
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strDrink: PropTypes.string.isRequired,
    strCategory: PropTypes.string.isRequired,
    strAlcoholic: PropTypes.string.isRequired,
    strInstructions: PropTypes.string.isRequired,
    strYoutube: PropTypes.string.isRequired,
  }).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  measures: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default DetailCard;
