import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function StartRecipe() {
  const history = useHistory();
  return (
    <button
      className="btnStart"
      onClick={ () => history.push(`${history.location.pathname}/in-progress`) }
      data-testid="start-recipe-btn"
    >
      Start Recipe
    </button>
  );
}

export default StartRecipe;
