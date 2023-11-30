import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import allIcon from '../images/allIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/DoneRecipes.css';

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

  const handleFilter = (filter) => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    if (filter === 'all') {
      setDoneRecipes(storedDoneRecipes);
    } else if (filter === 'meal') {
      const doneMeals = storedDoneRecipes.filter((recipe) => recipe.type === 'meal');
      setDoneRecipes(doneMeals);
    } else {
      const doneDrink = storedDoneRecipes.filter((recipe) => recipe.type === 'drink');
      setDoneRecipes(doneDrink);
    }
  };

  return (
    <div id="divDoneRecipes" className="height100vh">
      <Header />

      <div className="categories-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilter('all') }
        >
          <div>
            <img src={ allIcon } alt="" />
          </div>
          All
        </button>

        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilter('meal') }
        >
          <div>
            <img src={ mealIcon } alt="" />
          </div>
          Meals
        </button>

        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilter('drink') }
        >
          <div>
            <img src={ drinkIcon } alt="" />
          </div>
          Drinks
        </button>
      </div>

      <div className="done-favorite-recipe">
        {doneRecipes.map((recipe, index) => (
          <div className="recipe-card" key={ recipe.id }>
            <a href={ `#/${recipe.type}s/${recipe.id} ` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </a>

            <div className="card-info">
              <div>
                <a href={ `#/${recipe.type}s/${recipe.id} ` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </p>
                </a>
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

              {recipe.type === 'drink' ? (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.alcoholicOrNot}
                </p>
              ) : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {recipe.nationality}
                  {' '}
                  ·
                  {' '}
                  {recipe.category}
                </p>
              )}

              <p data-testid={ `${index}-horizontal-done-date` }>
                Done in:
                {' '}
                {recipe.doneDate}
              </p>

              <div className="tags">
                {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={ tagIndex }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
