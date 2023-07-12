import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchDrinkById, fetchMealById } from '../service/FetchAPI';
import DetailCard from '../components/DetailCard';

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

  return (
    <div>
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
    </div>

  );
}

export default RecipeDetails;
