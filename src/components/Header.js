import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/icone-perfil.png';
import searchIcon from '../images/icone pesquiar.png';
import SearchBar from './SearchBar';
import '../styles/Header.css';
import iconeRecipes from '../images/ícone Recipes app.png';
import logoRecipes from '../images/logo Recipes app.png';
import plateIcon from '../images/icone-prato.png';
import drinkIcon from '../images/icone-bebida.png';
import favIcon from '../images/favIcon.png';
import perfilYellow from '../images/perfilYellow.png';
import doneRecipesIcon from '../images/doneRecipesIcon.png';

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
      return <img src={ plateIcon } alt="" style={ { width: '40px', height: '30px' } } />;
    } if (getTitle() === 'Drinks') {
      return <img src={ drinkIcon } alt="" style={ { width: '25px', height: '26px' } } />;
    } if (getTitle() === 'Done Recipes') {
      return (<img
        src={ doneRecipesIcon }
        alt=""
        style={ { width: '40px', height: '39px' } }
      />);
    } if (getTitle() === 'Favorite Recipes') {
      return <img src={ favIcon } alt="" style={ { width: '39px', height: '39px' } } />;
    } if (getTitle() === 'Profile') {
      return (<img
        src={ perfilYellow }
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
          <img className="recipeIcon" src={ iconeRecipes } alt="" />
          <img className="logoIcon" src={ logoRecipes } alt="" />
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
