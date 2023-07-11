import React, { useEffect, useState } from 'react';

export default function DrinksCategorys() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.drinks);
    };

    fetchCategories();
  }, []);
  const magicNumber = 5;

  return (
    <div>
      {categories && categories.slice(0, magicNumber).map((categoryName) => (
        <div
          key={ categoryName.strCategory }
          data-testid={ `${categoryName.strCategory}-category-filter` }
        >
          <button type="button">{categoryName.strCategory}</button>
        </div>
      ))}
    </div>
  );
}
