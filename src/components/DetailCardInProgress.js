import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ShareButton from './ShareButton';
import FavoriteButton from './FavoriteButton';

function DetailCardInProgress(
  { recipe, id, image, name, category, ingredients, measures,
    instructions, video },
) {
  const location = useLocation();
  const history = useHistory();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (inProgressRecipes) {
      if (location.pathname.includes('meals')) {
        const checked = inProgressRecipes.meals[id];
        setSelectedIngredients(checked);
      } else {
        const checked = inProgressRecipes.drinks[id];
        setSelectedIngredients(checked);
      }
    }
  }, [id, location.pathname]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.some((favorite) => favorite.id === id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [id, setIsFavorite]);

  const handleClick = () => {
    // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    // const date = new Date();
    // const doneDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    // const doneRecipe = {
    //   id,
    //   type,
    //   nationality,
    //   category,
    //   alcoholicOrNot,
    //   name,
    //   image,
    //   doneDate,
    //   tags,
    // };
    // if (doneRecipes) {
    //   localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, doneRecipe]));
    // } else {
    //   localStorage.setItem('doneRecipes', JSON.stringify([doneRecipe]));
    // }
    history.push('/done-recipes');
  };

  const handleChange = (event, index) => {
    const { checked } = event.target;

    if (checked) {
      event.target.parentElement.style.textDecoration = 'line-through';
    } else {
      event.target.parentElement.style.textDecoration = 'none';
    }

    const inProgressRecipes = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { meals: {}, drinks: {} };
    if (checked && location.pathname.includes('meals')) {
      inProgressRecipes.meals[id] = [...selectedIngredients, ingredients[index][1]];
    } else if (checked && location.pathname.includes('drinks')) {
      inProgressRecipes.drinks[id] = [...selectedIngredients, ingredients[index][1]];
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    setSelectedIngredients([...selectedIngredients, ingredients[index][1]]);

    if (!checked && location.pathname.includes('meals')) {
      const newIngredients = selectedIngredients
        .filter((ingredient) => ingredient !== ingredients[index][1]);
      inProgressRecipes.meals[id] = newIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setSelectedIngredients(newIngredients);
    }
    if (!checked && location.pathname.includes('drinks')) {
      const newIngredients = selectedIngredients
        .filter((ingredient) => ingredient !== ingredients[index][1]);
      inProgressRecipes.drinks[id] = newIngredients;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
      setSelectedIngredients(newIngredients);
    }
  };

  return (
    <div>
      <img src={ image } alt={ name } data-testid="recipe-photo" />
      <p data-testid="recipe-title">{name}</p>
      <p data-testid="recipe-category">{category}</p>
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
      <p data-testid="instructions">{instructions}</p>
      {
        location.pathname.includes('meals') && video && (
          <iframe
            title="video"
            data-testid="video"
            width="320"
            height="240"
            src={ video.replace('watch?v=', 'embed/') }
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
      >
        Finish Recipes
      </button>
    </div>
  );
}

DetailCardInProgress.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  measures: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
};

export default DetailCardInProgress;
