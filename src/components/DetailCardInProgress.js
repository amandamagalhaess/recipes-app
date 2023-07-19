import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

function DetailCardInProgress({ recipe, ingredients, measures }) {
  const location = useLocation();
  const history = useHistory();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes) {
      if (location.pathname.includes('meals')) {
        const checked = inProgressRecipes.meals[recipe.idMeal];
        setSelectedIngredients(checked);
      } else {
        const checked = inProgressRecipes.drinks[recipe.idDrink];
        setSelectedIngredients(checked);
      }
    }
  }, [location.pathname, recipe.idDrink, recipe.idMeal]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.some((favorite) => favorite.id
    === recipe.idMeal || favorite.id === recipe.idDrink)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [recipe.idDrink, recipe.idMeal, setIsFavorite]);

  const handleClick = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    let recipeTags = [];
    if (recipe.idMeal) {
      recipeTags = recipe.strTags.split(',');
    }
    const date = new Date();
    const doneDate = date.toISOString();

    const doneRecipe = {
      id: recipe.idMeal || recipe.idDrink,
      type: recipe.idMeal ? 'meal' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate,
      tags: recipeTags,
    };

    if (doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    }
    history.push('/done-recipes');
  };

  const handleChange = (event, index) => {
    const { checked } = event.target;

    if (checked) {
      event.target.parentElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
    } else {
      event.target.parentElement.style.textDecoration = 'none';
    }

    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
    if (checked && location.pathname.includes('meals')) {
      inProgressRecipes.meals[recipe.idMeal] = [
        ...selectedIngredients, ingredients[index][1]];
    } else if (checked && location.pathname.includes('drinks')) {
      inProgressRecipes.drinks[recipe.idDrink] = [
        ...selectedIngredients, ingredients[index][1]];
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setSelectedIngredients([...selectedIngredients, ingredients[index][1]]);

    if (!checked && location.pathname.includes('meals')) {
      const newIngredients = selectedIngredients
        .filter((ingredient) => ingredient !== ingredients[index][1]);
      inProgressRecipes.meals[recipe.idMeal] = newIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setSelectedIngredients(newIngredients);
    }
    if (!checked && location.pathname.includes('drinks')) {
      const newIngredients = selectedIngredients
        .filter((ingredient) => ingredient !== ingredients[index][1]);
      inProgressRecipes.drinks[recipe.idDrink] = newIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setSelectedIngredients(newIngredients);
    }
  };

  return (
    <div>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</p>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <div>
        {
          ingredients.map((ingredient, index) => (
            <label key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                onChange={ (event) => handleChange(event, index) }
                checked={ selectedIngredients.includes(ingredient[1]) }
              />
              {`${ingredient[1]} - ${measures[index][1]}`}
            </label>
          ))
        }
      </div>
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
      <ShareButton />
      <FavoriteButton
        recipe={ recipe }
        isFavorite={ isFavorite }
        setIsFavorite={ setIsFavorite }
      />
      <button
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
        disabled={ selectedIngredients.length !== ingredients.length }
      >
        Finish Recipes
      </button>
    </div>
  );
}

DetailCardInProgress.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  measures: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,

};

export default DetailCardInProgress;
