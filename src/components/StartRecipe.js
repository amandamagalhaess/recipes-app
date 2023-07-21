import React from 'react';
import { useHistory, useLocation, useParams }
  from 'react-router-dom/cjs/react-router-dom.min';

function StartRecipe() {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();

  const handleClick = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      if (location.pathname.includes('meals')) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ meals: { [id]: [] }, drinks: {} }),
        );
      } else {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify({ meals: {}, drinks: { [id]: [] } }),
        );
      }
    } else {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (location.pathname.includes('meals')) {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify(
            { ...inProgressRecipes, meals: { ...inProgressRecipes.meals, [id]: [] } },
          ),
        );
      } else {
        localStorage.setItem(
          'inProgressRecipes',
          JSON.stringify(
            { ...inProgressRecipes, drinks: { ...inProgressRecipes.drinks, [id]: [] } },
          ),
        );
      }
    }

    history.push(`${location.pathname}/in-progress`);
  };

  return (
    <button
      className="btnStart"
      onClick={ handleClick }
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

export default StartRecipe;
