import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

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
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          {recipe.type === 'drink' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.alcoholicOrNot}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.nationality}
              {' '}
              -
              {' '}
              {recipe.category}
            </p>
          )}

          <p data-testid={ `${index}-horizontal-name` }>
            {recipe.name}
          </p>

          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>

          <button
            type="button"
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>

          {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
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
