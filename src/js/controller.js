import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model';
import recipeView from './views/recipeView';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1. loading Recipe
    await model.loadRecipe(id);

    // 2. Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    alert(error);
  }
};

['load', 'hashchange'].forEach(ev => window.addEventListener(ev, controlRecipe));
