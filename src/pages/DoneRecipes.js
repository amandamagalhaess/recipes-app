import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  useEffect(() => {
    const storedDoneRecipes = localStorage.getItem('doneRecipes');
    if (storedDoneRecipes) {
      setDoneRecipes(JSON.parse(storedDoneRecipes));
    }
  }, []);

  return (
    <div>
      <Header />

      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>

      <button type="button" data-testid="filter-by-meal-btn">
        Meals
      </button>

      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>

      {doneRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />

          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.category}
          </p>

          <p data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </p>

          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            Share
          </button>

          {recipe.tags.map((tag, tagIndex) => (
            <span
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
