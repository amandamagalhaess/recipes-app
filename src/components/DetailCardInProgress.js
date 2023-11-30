import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';
import { renderDrinkImage, renderMealImage } from '../service/renderImage';
import '../styles/RecipeDetailsInProgress.css';
import checkIcon from '../images/checkIcon.svg';

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
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (location.pathname.includes('meals')) {
      delete inProgressRecipes.meals[recipe.idMeal];
    } else {
      delete inProgressRecipes.drinks[recipe.idDrink];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    let recipeTags = [];
    if (recipe.idMeal && recipe.strTags) {
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

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes && !doneRecipes.some((done) => done.id === doneRecipe.id)) {
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
    } else if (!doneRecipes) {
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
    <div className="details-page">
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
              <div>
                <img src={ renderMealImage(recipe.strCategory) } alt="" />
                <p
                  data-testid="recipe-category"
                >
                  {recipe.strCategory}
                </p>
              </div>

              <div className="share-fav-btn">
                <ShareButton />
                <FavoriteButton
                  recipe={ recipe }
                  isFavorite={ isFavorite }
                  setIsFavorite={ setIsFavorite }
                />
              </div>
            </div>
          ) : (
            <div className="recipe-category">
              <div>
                <img src={ renderDrinkImage(recipe.strCategory) } alt="" />
                <p
                  data-testid="recipe-category"
                >
                  {recipe.strAlcoholic}
                </p>
              </div>

              <div className="share-fav-btn">
                <ShareButton />
                <FavoriteButton
                  recipe={ recipe }
                  isFavorite={ isFavorite }
                  setIsFavorite={ setIsFavorite }
                />
              </div>
            </div>
          )
        }
      </div>
      <div className="main-detail-container">
        <h1>Ingredients</h1>
        <div className="check-ingredients-container">
          {
            ingredients.map((ingredient, index) => (
              <div key={ index }>
                <label
                  data-testid={ `${index}-ingredient-step` }
                  style={ selectedIngredients.includes(ingredient[1])
                    ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
                    : { textDecoration: 'none' } }
                >
                  <input
                    type="checkbox"
                    onChange={ (event) => handleChange(event, index) }
                    checked={ selectedIngredients.includes(ingredient[1]) }
                  />
                  <img src={ checkIcon } alt="" className="check-icon" />
                  {`${ingredient[1]} - ${measures[index][1]}`}
                </label>
              </div>
            ))
          }
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

      <button
        data-testid="finish-recipe-btn"
        className="btnStart"
        onClick={ handleClick }
        disabled={ selectedIngredients.length !== ingredients.length }
      >
        Finish Recipe
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
