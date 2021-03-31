import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    // 1. Get ID of Recipe
    const id = window.location.hash.slice(1);
    if (!id) return;

    // 2. Rendering Spinner
    recipeView.renderSpinner();

    // 3. loading Recipe
    await model.loadRecipe(id);

    // 4. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1. Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    // 2. Rendering Spinner
    resultsView.renderSpinner();

    // 3. Load Search Results
    await model.loadSearchResults(query);

    // 4. Render Results
    resultsView.render(model.state.search.results);
  } catch (error) {
    console.log(error);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
