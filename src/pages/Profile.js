import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
      <p data-testid="profile-email">{getEmail()}</p>
      <div>
        <button
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
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
      <Footer />
    </>
  );
}
