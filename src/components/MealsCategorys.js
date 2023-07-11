import React, { useEffect, useState } from 'react';

export default function MealsCategorys() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      setCategories(data.meals);
    };

    fetchCategories();
  }, []);
  const magicNumber = 5;

  return (
    <div>
      {categories && categories.slice(0, magicNumber).map((category) => (
        <div
          key={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
        >
          <button type="button">{category.strCategory}</button>
        </div>
      ))}
    </div>
  );
}
