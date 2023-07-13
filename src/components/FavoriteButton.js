import React from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteButton({ recipe, isFavorite, setIsFavorite }) {
  const { id } = useParams();
  const location = useLocation();

  const handleFavoriteButton = () => {
    const { pathname } = location;
    const type = pathname.includes('meals') ? 'meal' : 'drink';
    const favoriteRecipe = {
      id,
      type,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
    };
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];

    if (isFavorite) {
      setIsFavorite(false);
      const newFavoriteRecipes = favoriteRecipes.filter((favorite) => favorite.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    } else {
      setIsFavorite(true);
      localStorage.setItem('favoriteRecipes', JSON
        .stringify([...favoriteRecipes, favoriteRecipe]));
    }
  };
  return (
    <div>
      { localStorage.getItem('favoriteRecipes') && JSON
        .parse(localStorage.getItem('favoriteRecipes').includes(id))
        ? (
          <button
            onClick={ handleFavoriteButton }
          >
            <img src={ blackHeartIcon } alt="" data-testid="favorite-btn" />
          </button>
        ) : (
          <button
            onClick={ handleFavoriteButton }
          >
            <img
              src={ whiteHeartIcon }
              alt=""
              data-testid="favorite-btn"
            />
          </button>
        )}
    </div>
  );
}

FavoriteButton.propTypes = {
  recipe: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  setIsFavorite: PropTypes.func.isRequired,
};

export default FavoriteButton;
