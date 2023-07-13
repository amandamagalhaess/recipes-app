import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrinkById, fetchMealById } from '../service/FetchAPI';
import DetailCard from '../components/DetailCard';
import RecommendationCarousel from '../components/RecomendationCarousel';
import StartRecipe from '../components/StartRecipe';
import ContinueRecipe from '../components/ContinueRecipe';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [recipe, setRecipe] = useState(undefined);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (location.pathname.includes('meals')) {
        const mealDetails = await fetchMealById(id);
        setRecipe(mealDetails);
        setIngredients(Object.entries(mealDetails)
          .filter((entry) => entry[0].includes('strIngredient'))
          .filter((entry) => entry[1] !== ''));
        setMeasures(Object.entries(mealDetails)
          .filter((entry) => entry[0].includes('strMeasure')));
      } else {
        const drinkDetails = await fetchDrinkById(id);
        setRecipe(drinkDetails);
        setIngredients(Object.entries(drinkDetails)
          .filter((entry) => entry[0].includes('strIngredient'))
          .filter((entry) => entry[1] !== null));
        setMeasures(Object.entries(drinkDetails)
          .filter((entry) => entry[0].includes('strMeasure')));
      }
    };
    fetchRecipe();
  }, [id, location.pathname]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.some((favorite) => favorite.id === id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [id]);

  const handleShareButton = () => {
    const { pathname } = location;
    const url = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(url);
    const detailsContainer = document.getElementById('details-container');
    const copyLink = document.createElement('p');
    copyLink.innerHTML = 'Link copied!';
    detailsContainer.appendChild(copyLink);
  };

  const handleFavoriteButton = () => {
    const { pathname } = location;
    const { strCategory, strAlcoholic } = recipe;
    const type = pathname.includes('meals') ? 'meal' : 'drink';
    const favoriteRecipe = {
      id,
      type,
      nationality: recipe.strArea || '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic || '',
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
    <div id="details-container">
      { recipe && (
        location.pathname.includes('meals') ? (
          <DetailCard
            image={ recipe.strMealThumb }
            name={ recipe.strMeal }
            category={ recipe.strCategory }
            ingredients={ ingredients }
            measures={ measures }
            instructions={ recipe.strInstructions }
            video={ recipe.strYoutube }
          />
        ) : (
          <DetailCard
            image={ recipe.strDrinkThumb }
            name={ recipe.strDrink }
            category={ recipe.strAlcoholic }
            ingredients={ ingredients }
            measures={ measures }
            instructions={ recipe.strInstructions }
            video=""
          />
        )
      )}
      <RecommendationCarousel />
      <button
        data-testid="share-btn"
        onClick={ handleShareButton }

      >
        <img src={ shareIcon } alt="" />
      </button>
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

      { localStorage.getItem('inProgressRecipes') && JSON
        .parse(localStorage.getItem('inProgressRecipes').includes(id))
        ? <ContinueRecipe /> : <StartRecipe />}

    </div>

  );
}

export default RecipeDetails;
