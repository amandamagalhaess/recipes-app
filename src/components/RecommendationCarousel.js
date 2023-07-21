import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import '../styles/RecomendationCarousel.css';

function RecommendationCarousel() {
  const { meals, drinks } = useContext(RecipesContext);
  const location = useLocation();

  const [startIndex] = useState(0);
  const totalCards = 6;

  return (
    <div className="carousel-main-container">
      { meals.length > 0 && drinks.length > 0 && (
        <div className="carousel">
          {Array.from({ length: totalCards }).map((_, index) => {
            const cardIndex = (startIndex + index) % totalCards;
            return (
              <div
                className="card-carousel"
                key={ cardIndex }
                data-testid={ `${cardIndex}-recommendation-card` }
              >
                <img
                  src={ location.pathname.includes('/drinks')
                    ? meals[cardIndex].strMealThumb
                    : drinks[cardIndex].strDrinkThumb }
                  alt={ location.pathname.includes('/drinks')
                    ? meals[cardIndex].strMeal
                    : drinks[cardIndex].strDrink }
                />
                <p data-testid={ `${index}-recommendation-title` }>
                  {location.pathname.includes('/drinks')
                    ? meals[cardIndex].strMeal
                    : drinks[cardIndex].strDrink}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>

  );
}

export default RecommendationCarousel;
