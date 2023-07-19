import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../styles/Footer.css';

export default function Footer() {
  return (
    <footer data-testid="footer">
      <a href="/drinks">
        <img
          className="drinkIcon"
          src={ drinkIcon }
          alt="Drink Icon"
          data-testid="drinks-bottom-btn"
        />
      </a>
      <a href="/meals">
        <img
          className="mealIcon"
          src={ mealIcon }
          alt="Meal Icon"
          data-testid="meals-bottom-btn"
        />
      </a>

    </footer>
  );
}
