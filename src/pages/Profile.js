import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import favIcon from '../images/favoritesIcon.svg';
import doneIcon from '../images/doneRecipesIcon.svg';
import logoutIcon from '../images/logoutIcon.svg';

export default function Profile() {
  const history = useHistory();

  const getEmail = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.email;
    }
    return '';
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <p data-testid="profile-email" className="email">{getEmail()}</p>
        <div className="mainContainer">
          <div className="profile-navigation">
            <img src={ doneIcon } alt="" />
            <button
              data-testid="profile-done-btn"
              onClick={ () => history.push('/done-recipes') }
            >
              Done Recipes
            </button>
          </div>
          <div className="profile-navigation favoriteRecipe">
            <img src={ favIcon } alt="" />
            <button
              data-testid="profile-favorite-btn"
              onClick={ () => history.push('/favorite-recipes') }
            >
              Favorite Recipes
            </button>
          </div>
          <div className="profile-navigation">
            <img src={ logoutIcon } alt="" />
            <button
              data-testid="profile-logout-btn"
              onClick={ () => {
                localStorage.clear();
                history.push('/');
              } }
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
