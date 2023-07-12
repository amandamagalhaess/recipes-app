import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import Card from '../components/Card';
import Categories from '../components/Categories';

function Recipes() {
  const { meals, drinks } = useContext(RecipesContext);
  const limit = 12;
  const location = useLocation();

  return (
    <div>
      <Header />
      <Categories />
      {
        location.pathname === '/meals' ? (
          meals && meals.length > 0 && meals
            .slice(0, limit).map((meal, index) => (
              <Card
                key={ meal.idMeal }
                id={ meal.idMeal }
                image={ meal.strMealThumb }
                name={ meal.strMeal }
                index={ index }
              />
            ))
        ) : (
          drinks && drinks.length > 0 && drinks
            .slice(0, limit).map((drink, index) => (
              <Card
                key={ drink.idDrink }
                id={ drink.idDrink }
                image={ drink.strDrinkThumb }
                name={ drink.strDrink }
                index={ index }
              />
            ))
        )
      }
      <Footer />
    </div>
  );
}

export default Recipes;
