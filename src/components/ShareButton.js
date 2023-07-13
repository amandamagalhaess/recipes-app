import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const location = useLocation();

  const handleShareButton = () => {
    const { pathname } = location;
    const url = `http://localhost:3000${pathname}`;
    navigator.clipboard.writeText(url);
    const detailsContainer = document.getElementById('details-container');
    const copyLink = document.createElement('p');
    copyLink.innerHTML = 'Link copied!';
    detailsContainer.appendChild(copyLink);
  };

  return (
    <button
      data-testid="share-btn"
      onClick={ handleShareButton }
    >
      <img src={ shareIcon } alt="" />
    </button>
  );
}

export default ShareButton;
