import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [searchOptions, setSearchOptions] = useState('');
  const [searchText, setSearchText] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);

  // useEffect(() => {
  //   const fetchMeals = async () => {
  //     const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //     const data = await response.json();
  //     setMeals(data.meals);
  //   };

  //   fetchMeals();
  // }, []);

  const value = useMemo(() => ({
    email,
    setEmail,
    password,
    setPassword,
    isButtonDisabled,
    setButtonDisabled,
    searchOptions,
    setSearchOptions,
    searchText,
    setSearchText,
    meals,
    setMeals,
    drinks,
    setDrinks,
  }), [drinks, email, isButtonDisabled, meals, password, searchOptions, searchText]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
