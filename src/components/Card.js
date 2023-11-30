import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/Card.css';

function Card({ id, image, name, index }) {
  const location = useLocation();

  return (
    <a
      href={ location.pathname === '/meals' ? `#/meals/${id}` : `#/drinks/${id}` }
      className="link-content"
    >
      <div data-testid={ `${index}-recipe-card` } className="recipe-info">
        <img
          src={ image }
          alt={ name }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{name}</p>
      </div>
    </a>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
