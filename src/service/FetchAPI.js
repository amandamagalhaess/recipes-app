export const fetchMeals = async (searchOptions, searchText) => {
  if (searchOptions === 'ingredient') {
    return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
      .then((response) => response.json())
      .then((data) => data.meals);
  } if (searchOptions === 'name') {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((response) => response.json())
      .then((data) => data.meals);
  } if (searchText.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
      .then((response) => response.json())
      .then((data) => data.meals);
  }
};

export const fetchDrinks = async (searchOptions, searchText) => {
  if (searchOptions === 'ingredient') {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchText}`)
      .then((response) => response.json())
      .then((data) => data.drinks);
  } if (searchOptions === 'name') {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((response) => response.json())
      .then((data) => data.drinks);
  } if (searchText.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
      .then((response) => response.json())
      .then((data) => data.drinks);
  }
};
