import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function StartRecipe() {
  const history = useHistory();

  const handleClick = () => {
    history.push(`${history.location.pathname}/in-progress`);
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
