import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon2.svg';
import searchIcon from '../images/searchIcon2.svg';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import recipesAppIcon from '../images/recipesAppIcon.svg';
import recipesAppLogo from '../images/recipesAppLogo.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import favoritesIcon from '../images/favoritesIcon.svg';
import profilePageIcon from '../images/profilePageIcon.svg';
import doneRecipesIcon from '../images/doneRecipesIcon.svg';

export default function Header() {
  const location = useLocation();
  const history = useHistory();

  const getTitle = () => {
    switch (location.pathname) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return '';
    }
  };
  const handleProfileClick = () => {
    history.push('/profile');
  };

  const showSearchIcon = ['/meals', '/drinks'].includes(location.pathname);

  const handleSearchClick = () => {
    const searchInput = document.querySelector('input');
    const searchContent = document.querySelector('[data-testid="search-content"]');

    if (searchContent.style.display === 'none') {
      searchContent.style.display = 'block';
      searchInput.dataset.testid = 'search-input';
    } else {
      searchContent.style.display = 'none';
      searchInput.dataset.testid = '';
    }
  };

  const renderImage = () => {
    if (getTitle() === 'Meals') {
      return (<img
        src={ mealIcon }
        alt=""
        style={ { width: '40px', height: '30px' } }
      />);
    } if (getTitle() === 'Drinks') {
      return (<img
        src={ drinkIcon }
        alt=""
        style={ { width: '25px', height: '26px' } }
      />);
    } if (getTitle() === 'Done Recipes') {
      return (<img
        src={ doneRecipesIcon }
        alt=""
        style={ { width: '40px', height: '39px' } }
      />);
    } if (getTitle() === 'Favorite Recipes') {
      return (<img
        src={ favoritesIcon }
        alt=""
        style={ { width: '39px', height: '39px' } }
      />);
    } if (getTitle() === 'Profile') {
      return (<img
        src={ profilePageIcon }
        alt=""
        style={ { width: '30px', height: '30px' } }
      />);
    }
    return null;
  };

  return (
    <div>
      <header>
        <div className="leftIcons">
          <img className="recipeIcon" src={ recipesAppIcon } alt="" />
          <img className="logoIcon" src={ recipesAppLogo } alt="" />
        </div>
        <div className="rightIcons">
          { showSearchIcon && (
            <button className="searchIconBtn" onClick={ handleSearchClick }>
              <img
                alt="Ícone de Pesquisa"
                src={ searchIcon }
                data-testid="search-top-btn"
                className="searchIcon"
              />
            </button>
          )}
          <a
            href="/profile"
            onClick={ handleProfileClick }
          >
            <img
              alt="Ícone de Perfil"
              src={ profileIcon }
              data-testid="profile-top-btn"
              className="profileIcon"
            />
          </a>
        </div>
      </header>
      <div className="MealOrDrinkContainer">
        {renderImage()}
        <h1 data-testid="page-title">{getTitle()}</h1>
      </div>
      <SearchBar />
    </div>
  );
}
