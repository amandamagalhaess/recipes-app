import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Profile.css';
import favIcon from '../images/favIcon.png';
import doneIcon from '../images/doneRecipesIcon.png';
import logoutIcon from '../images/logoutIcon.png';

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
    <>
      <Header />
      <p data-testid="profile-email" className="email">{getEmail()}</p>
      <div className="mainContainer">
        <div className="perfilsContainer">
          <img src={ doneIcon } alt="" className="Icons" />
          <button
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
        </div>
        <div className="perfilsContainer favoriteRecipe">
          <img src={ favIcon } alt="" className="Icons" />
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
        </div>
        <div className="perfilsContainer">
          <img src={ logoutIcon } alt="" className="Icons" />
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
      <Footer />
    </>
  );
}
