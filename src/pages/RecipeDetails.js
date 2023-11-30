import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrinkById, fetchMealById } from '../service/FetchAPI';
import DetailCard from '../components/DetailCard';
import RecommendationCarousel from '../components/RecommendationCarousel';
import StartRecipe from '../components/StartRecipe';
import ContinueRecipe from '../components/ContinueRecipe';
import '../styles/RecipeDetails.css';

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

  return (
    <div className="details-page" id="details-container">
      { recipe && <DetailCard
        recipe={ recipe }
        ingredients={ ingredients }
        measures={ measures }
      />}

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
