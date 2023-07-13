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

  const handleShareButton = (value) => {
    const parsedValue = JSON.parse(value);
    let url;
    console.log(parsedValue);

    if (parsedValue.type === 'meal') {
      url = `http://localhost:3000/meals/${parsedValue.id}`;
    } else {
      url = `http://localhost:3000/drinks/${parsedValue.id}`;
    }

    navigator.clipboard.writeText(url);
    const divDoneRecipes = document.getElementById('divDoneRecipes');
    const copyLink = document.createElement('p');
    copyLink.innerHTML = 'Link copied!';
    divDoneRecipes.appendChild(copyLink);
  };

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
        <div id="divDoneRecipes" key={ recipe.id }>
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
            onClick={ () => handleShareButton(JSON.stringify(recipe)) }
            value={ JSON.stringify(recipe) }
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
