import beefIcon from '../images/beefIcon.svg';
import breakfastIcon from '../images/breakfastIcon.svg';
import chickenIcon from '../images/chickenIcon.svg';
import dessertIcon from '../images/dessertIcon.svg';
import goatIcon from '../images/goatIcon.svg';
import ordinaryIcon from '../images/ordinaryDrinkIcon.svg';
import cocktailIcon from '../images/cocktailIcon.svg';
import shakeIcon from '../images/shakeIcon.svg';
import otherIcon from '../images/otherIcon.svg';
import cocoaIcon from '../images/cocoaIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export const renderMealImage = (category) => {
  switch (category) {
  case 'Beef':
    return beefIcon;
  case 'Breakfast':
    return breakfastIcon;
  case 'Chicken':
    return chickenIcon;
  case 'Dessert':
    return dessertIcon;
  case 'Goat':
    return goatIcon;
  default:
    return mealIcon;
  }
};

export const renderDrinkImage = (category) => {
  switch (category) {
  case 'Ordinary Drink':
    return ordinaryIcon;
  case 'Cocktail':
    return cocktailIcon;
  case 'Shake':
    return shakeIcon;
  case 'Other/Unknown':
    return otherIcon;
  case 'Cocoa':
    return cocoaIcon;
  default:
    return drinkIcon;
  }
};
