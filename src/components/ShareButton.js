import React from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const location = useLocation();

  const handleShareButton = () => {
    const { pathname } = location;

    let url;

    if (pathname.includes('in-progress')) {
      url = `http://localhost:3000${pathname.replace('/in-progress', '')}`;
    } else {
      url = `http://localhost:3000${pathname}`;
    }

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
      <img src={ shareIcon } alt="" className="share-btn" />
    </button>
  );
}

export default ShareButton;
