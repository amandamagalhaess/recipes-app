import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

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

  const showSeachIcon = ['/meals', '/drinks'].includes(location.pathname);

  return (
    <div>
      <a
        href="/profile"
        onClick={ handleProfileClick }
      >
        <img
          alt="Ícone de Perfil"
          src={ profileIcon }
          data-testid="profile-top-btn"
        />
      </a>
      { showSeachIcon && (
        <img alt="Ícone de Pesquisa" src={ searchIcon } data-testid="search-top-btn" />
      )}
      <h1 data-testid="page-title">{getTitle()}</h1>
    </div>
  );
}
