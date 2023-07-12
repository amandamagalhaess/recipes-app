import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrinkById, fetchMealById } from '../service/FetchAPI';
import DetailCard from '../components/DetailCard';
import RecommendationCarousel from '../components/RecomendationCarousel';
import StartRecipe from '../components/StartRecipe';
import ContinueRecipe from '../components/ContinueRecipe';
import shareIcon from '../images/shareIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [recipe, setRecipe] = useState(undefined);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

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
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favoriteRecipes, favoriteRecipe]));
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
      <button
        data-testid="favorite-btn"
        onClick={ handleFavoriteButton }
      >
        Favorite
      </button>
      { localStorage.getItem('inProgressRecipes') && JSON
        .parse(localStorage.getItem('inProgressRecipes').includes(id))
        ? <ContinueRecipe /> : <StartRecipe />}

    </div>

  );
}

export default RecipeDetails;
