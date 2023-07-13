import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

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

  const handleFilter = ({ target }) => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    if (target.dataset.testid === 'filter-by-all-btn') {
      setFavoriteRecipes(storedFavoriteRecipes);
    } else if (target.dataset.testid === 'filter-by-meal-btn') {
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

      {favoriteRecipes.map((recipegit, index) => (
        <div id="divFavorites" key={ recipegit.id }>
          <a href={ `/${recipegit.type}s/${recipegit.id} ` }>
            <img
              src={ recipegit.image }
              alt={ recipegit.name }
              data-testid={ `${index}-horizontal-image` }
            />

          </a>
          {recipegit.type === 'drink' ? (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipegit.alcoholicOrNot}
            </p>
          ) : (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipegit.nationality}
              {' '}
              -
              {' '}
              {recipegit.category}
            </p>
          )}
          <a href={ `/${recipegit.type}s/${recipegit.id} ` }>
            <p data-testid={ `${index}-horizontal-name` }>
              {recipegit.name}
            </p>
          </a>

          <p data-testid={ `${index}-horizontal-done-date` }>
            {recipegit.doneDate}
          </p>
          {/* {recipegit.tags.slice(0, 2).map((tag, tagIndex) => (
            <span
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))} */}
          <button
            type="button"
            onClick={ () => handleShareButton(JSON.stringify(recipegit)) }
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button
            type="button"
            onClick={ () => handleDesfavoriteButton(JSON.stringify(recipegit)) }
          >
            <img
              src={ blackHeartIcon }
              alt=""
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>

        </div>
      ))}
    </div>
  );
}
