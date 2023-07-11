import React, { useContext } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import DrinksCategorys from '../components/DrinksCategorys';

export default function Drinks() {
  const { drinks } = useContext(RecipesContext);
  const limit = 12;

  return (
    <div>
      <Header />
      <DrinksCategorys />
      {
        drinks && drinks.length > 0 && drinks.slice(0, limit).map((drink, index) => (
          <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
