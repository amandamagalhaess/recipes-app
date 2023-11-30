import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import allIcon from '../images/allIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  // _________________________________________________________
  useEffect(() => {
    const storedFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (storedFavoriteRecipes) {
      setFavoriteRecipes(JSON.parse(storedFavoriteRecipes));
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
    const divFavorites = document.getElementById('divFavorites');
    const copyLink = document.createElement('p');
    copyLink.innerHTML = 'Link copied!';
    divFavorites.appendChild(copyLink);
  };

  const handleDesfavoriteButton = (value) => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const parsedValue = JSON.parse(value);
    const newFavoriteRecipes = storedFavoriteRecipes
      .filter((recipes) => recipes.id !== parsedValue.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
    setFavoriteRecipes(newFavoriteRecipes);
  };

  const handleFilter = (filter) => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (filter === 'all') {
      setFavoriteRecipes(storedFavoriteRecipes);
    } else if (filter === 'meal') {
      const doneMeals = storedFavoriteRecipes
        .filter((recipes) => recipes.type === 'meal');
      setFavoriteRecipes(doneMeals);
    } else {
      const doneDrink = storedFavoriteRecipes
        .filter((recipes) => recipes.type === 'drink');
      setFavoriteRecipes(doneDrink);
    }
  };

  return (
    <div id="divFavorites" className="height100vh">
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
        {favoriteRecipes.map((recipe, index) => (
          <div className="recipe-card" key={ recipe.id }>
            <a href={ `#/${recipe.type}s/${recipe.id} ` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </a>

            <div className="card-info card-info-in-favorites">
              <div>
                <a href={ `#/${recipe.type}s/${recipe.id} ` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {recipe.name}
                  </p>
                </a>
              </div>

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

              <div className="buttons">
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

                <button
                  type="button"
                  onClick={ () => handleDesfavoriteButton(JSON.stringify(recipe)) }
                >
                  <img
                    src={ blackHeartIcon }
                    alt=""
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
