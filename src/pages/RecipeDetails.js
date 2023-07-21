import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrinkById, fetchMealById } from '../service/FetchAPI';
import DetailCard from '../components/DetailCard';
import RecommendationCarousel from '../components/RecommendationCarousel';
import StartRecipe from '../components/StartRecipe';
import ContinueRecipe from '../components/ContinueRecipe';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import '../styles/RecipeDetails.css';

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
          .filter((entry) => entry[1] !== '' && entry[1] !== null));
        setMeasures(Object.entries(mealDetails)
          .filter((entry) => entry[0].includes('strMeasure')));
      } else {
        const drinkDetails = await fetchDrinkById(id);
        setRecipe(drinkDetails);
        setIngredients(Object.entries(drinkDetails)
          .filter((entry) => entry[0].includes('strIngredient'))
          .filter((entry) => entry[1] !== '' && entry[1] !== null));
        setMeasures(Object.entries(drinkDetails)
          .filter((entry) => entry[0].includes('strMeasure')));
      }
    };
    fetchRecipe();
  }, [id, location.pathname, setIngredients, setMeasures, setRecipe]);

  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    if (favoriteRecipes.some((favorite) => favorite.id === id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [id, setIsFavorite]);

  return (
    <div className="details-page" id="details-container">
      { recipe && <DetailCard
        recipe={ recipe }
        ingredients={ ingredients }
        measures={ measures }
      />}
      <div className="share-fav-btn">
        <ShareButton />
        <FavoriteButton
          recipe={ recipe }
          isFavorite={ isFavorite }
          setIsFavorite={ setIsFavorite }
        />
      </div>
      <div className="recommended-container">
        <h1> Recommended </h1>
        <RecommendationCarousel />
      </div>

      {
        localStorage.getItem('inProgressRecipes') && JSON
          .parse(localStorage.getItem('inProgressRecipes').includes(id))
          ? <ContinueRecipe /> : <StartRecipe />
      }

    </div>

  );
}

export default RecipeDetails;
