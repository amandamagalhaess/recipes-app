import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { renderDrinkImage, renderMealImage } from '../service/renderImage';
// import drinkIcon from '../images/drinkIcon.svg';

function DetailCard({ recipe, ingredients, measures }) {
  const location = useLocation();

  return (
    <div>
      <div className="photo-title-container">
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid="recipe-photo"
          className="recipe-photo"
        />
        <p
          data-testid="recipe-title"
          className="recipe-title"
        >
          {recipe.strMeal || recipe.strDrink}

        </p>
        {
          location.pathname.includes('meals') ? (
            <div className="recipe-category">
              <img src={ renderMealImage(recipe.strCategory) } alt="" />
              <p
                data-testid="recipe-category"
              >
                {recipe.strCategory}
              </p>
            </div>
          ) : (
            <div className="recipe-category">
              <img src={ renderDrinkImage(recipe.strCategory) } alt="" />
              <p
                data-testid="recipe-category"
              >
                {recipe.strAlcoholic}
              </p>
            </div>
          )
        }
      </div>
      <div className="main-detail-container">
        <h1>Ingredients</h1>
        <div className="ingredients-container">
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
        </div>
        <h1>Instructions</h1>
        <div className="instructions-container">
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        {
          location.pathname.includes('meals') && recipe.strYoutube && (
            <div className="video-container">
              <h1>Video</h1>
              <iframe
                title="video"
                data-testid="video"
                width="338"
                height="240"
                src={ recipe.strYoutube.replace('watch?v=', 'embed/') }
              />
            </div>
          )
        }
      </div>
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
