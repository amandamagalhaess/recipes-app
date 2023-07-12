import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipesContext from '../context/RecipesContext';
import '../styles/RecomendationCarousel.css';

function RecommendationCarousel() {
  const { meals, drinks } = useContext(RecipesContext);
  const location = useLocation();

  const [startIndex, setStartIndex] = useState(0);
  const totalCards = 6;
  const numVisibleCards = 2;

  const handleScrollNext = () => {
    const lastIndex = totalCards - numVisibleCards;
    const nextIndex = (startIndex + 2) % (lastIndex + 2);
    setStartIndex(nextIndex);
  };

  const handleScrollPrev = () => {
    const lastIndex = totalCards - numVisibleCards;
    const prevIndex = startIndex === 0 ? lastIndex : startIndex - 2;
    setStartIndex(prevIndex);
  };

  return (
    <div>
      { meals.length > 0 && drinks.length > 0 && (
        <>
          <button onClick={ handleScrollPrev }>Anterior</button>

          <div className="carousel">
            {Array.from({ length: totalCards }).map((_, index) => {
              const cardIndex = (startIndex + index) % totalCards;
              return (
                <div
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

          <button onClick={ handleScrollNext }>Próxima</button>
        </>
      )}
    </div>
  );
}

export default RecommendationCarousel;
