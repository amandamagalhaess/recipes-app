import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function DetailCard(
  { image, name, category, ingredients, measures, instructions, video },
) {
  const location = useLocation();
  return (
    <div>
      <img src={ image } alt={ name } data-testid="recipe-photo" />
      <p data-testid="recipe-title">{name}</p>
      <p data-testid="recipe-category">{category}</p>
      <ul>
        {
          ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient[1]} - ${measures[index][1]}`}
            </li>
          ))
        }
      </ul>
      <p data-testid="instructions">{instructions}</p>
      {
        location.pathname.includes('meals') && video && (
          <iframe
            title="video"
            data-testid="video"
            width="320"
            height="240"
            src={ video.replace('watch?v=', 'embed/') }
          />
        )
      }
    </div>
  );
}

DetailCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  measures: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  instructions: PropTypes.string.isRequired,
  video: PropTypes.string.isRequired,
};

export default DetailCard;
