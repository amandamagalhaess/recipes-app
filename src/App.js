import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Login from './pages/Login';
import RecipesProvider from './context/RecipesProvider';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MealsDetail from './pages/MealsDetail';
import DrinksDetail from './pages/DrinksDetail';
import Recipes from './pages/Recipes';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/meals/:id" component={ MealsDetail } />
        <Route exact path="/drinks/:id" component={ DrinksDetail } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
