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

  const handleFilter = ({ target }) => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    if (target.dataset.testid === 'filter-by-all-btn') {
      setDoneRecipes(storedDoneRecipes);
    } else if (target.dataset.testid === 'filter-by-meal-btn') {
      const doneMeals = storedDoneRecipes.filter((recipe) => recipe.type === 'meal');
      setDoneRecipes(doneMeals);
    } else {
      const doneDrink = storedDoneRecipes.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(doneDrink);
    }
  };

  return (
    <div>
      <Header />

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilter }
      >
        All
      </button>

      <button type="button" data-testid="filter-by-meal-btn" onClick={ handleFilter }>
        Meals
      </button>

      <button type="button" data-testid="filter-by-drink-btn" onClick={ handleFilter }>
        Drinks
      </button>

      {doneRecipes.map((recipe, index) => (
        <div id="divDoneRecipes" key={ recipe.id }>
          <a href={ `/${recipe.type}s/${recipe.id} ` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />

          </a>
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
          <a href={ `/${recipe.type}s/${recipe.id} ` }>
            <p data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </p>
          </a>

          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipe.doneDate}
          </p>
          {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
            <span
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
          <button
            type="button"
            onClick={ () => handleShareButton(JSON.stringify(recipe)) }
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>

        </div>
      ))}
    </div>
  );
}
