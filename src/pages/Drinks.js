import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import Footer from '../components/Footer';
import DrinksCategories from '../components/DrinksCategories';

export default function Drinks() {
  const { drinks } = useContext(RecipesContext);
  const limit = 12;

  const [filterDrinks, setFilterDrinks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (selectedCategory === '') {
      setFilterDrinks(drinks);
    } else {
      const filter = drinks.filter((drink) => drink.strCategory === selectedCategory);
      setFilterDrinks(filter);
    }
  }, [drinks, selectedCategory]);

  const categoryFilter = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header />
      <DrinksCategories categoryFilter={ categoryFilter } />
      {
        filterDrinks && filterDrinks.length > 0 && filterDrinks
          .slice(0, limit).map((drink, index) => (
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
