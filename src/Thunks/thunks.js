import Axios from 'axios';
import store, { SET_CHEFS, SET_RECIPES } from '../store';

const notification = (text) => {
  const notificationElement = document.querySelector('.notification');
  notificationElement.innerText = `${text}`;
}


const mapStateToProps = (state) => {
  return {
    chefs: state.chefs,
    recipes: state.recipes,
    current: state.current
  }
}
// when dispatching with connect and mapDispatchToProps, no need to use store.dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    getData: async () => {
      await Axios.all([Axios.get('http://localhost:3003/api/chefs'), Axios.get('http://localhost:3003/api/recipes')])
        .then(((response) => {
          const [{ data: { chefs: chefs } }, { data: { recipes: recipes } }] = response;
          store.dispatch({
            type: SET_CHEFS,
            chefs
          })
          store.dispatch({
            type: SET_RECIPES,
            recipes
          })
        }))
    },
    async addChef(event, inputText) {
      event.preventDefault();
      const { chefs } = store.getState();
      const input = inputText;
      await Axios.post('/api/chefs', { name: input })
        .then(response => {
          store.dispatch({
            type: SET_CHEFS,
            chefs: [...chefs, response.data.chef]
          });
          notification(`Chef ${input} was succesfully added!`);
        })
    },
    async updateChef(event, obj) {
      event.preventDefault();
      const { input, chefId } = obj;
      const { chefs } = store.getState();
      const findChef = chefs.find(chef => chef.id === chefId); // Just realized all of these could be placed into a helper function, so it's not repetitive.
      await Axios.put(`/api/chefs/${chefId}`, { name: input }).then((response) => {
        const updatedChef = response.data.updatedChef;
        const updatedChefsList = chefs.map(chef => chef.id === chefId ? updatedChef : chef)
        store.dispatch({  // UPDATE CHEFS LIST
          type: SET_CHEFS,
          chefs: updatedChefsList
        })
        notification(`Chef name updated from "${findChef.name}" to "${updatedChef.name}"`)
      })
    },
    async deleteChef(event, chefId) {
      event.preventDefault();
      const { chefs, recipes } = store.getState();
      const findChef = chefs.find(chef => chef.id === chefId); // Just realized all of these could be placed into a helper function, so it's not repetitive.
      const findRecipes = recipes.filter(recipe => recipe.chefId === chefId); // Just realized all of these could be placed into a helper function, so it's not repetitive.
      if (!findChef) {
        notification(`Chef not found!`);
      } else {
        const confirmDelete = confirm(`Chef ${findChef.name} has ${findRecipes.length} recipes, are you sure you want to delete?`);
        if (!confirmDelete) {
          return;
        } else {
          await Axios.delete(`/api/chefs/${chefId}`).then(response => {
            const updatedChefs = chefs.filter(chef => chef.id !== chefId);
            const updatedRecipes = recipes.filter(recipe => recipe.chefId !== chefId);
            store.dispatch({  // UPDATE CHEFS LIST
              type: SET_CHEFS,
              chefs: updatedChefs
            });
            store.dispatch({  // UPDATE RECIPES LIST
              type: SET_RECIPES,
              recipes: updatedRecipes
            });
            window.location.href = '/#/chefs'; // REDIRECT BACK TO CHEFS LIST
          })
        }
      }
    },
    async addRecipe(event, obj) {
      event.preventDefault();
      const { chefs, recipes } = store.getState();
      const { input, selected } = obj;
      const findChef = chefs.find(chef => chef.name === selected); // Just realized all of these could be placed into a helper function, so it's not repetitive.
      const notification = document.querySelector('.notification');
      await Axios.post('/api/recipes', { name: input, chefId: findChef.id })
        .then(response => {
          store.dispatch({
            type: SET_RECIPES,
            recipes: [response.data.recipe, ...recipes]
          });
          notification.innerText = `"${input}" by Chef ${findChef.name} was succesfully added!`;
        });
    },
    async updateRecipe(event, obj) {
      event.preventDefault();
      const { input, recipeId, selected } = obj;
      const { recipes, chefs } = store.getState();
      const findRecipe = recipes.find(recipe => recipe.id === recipeId); // Just realized all of these could be placed into a helper function, so it's not repetitive.
      const currentChef = chefs.find(chef => chef.id === findRecipe.chefId); // Just realized all of these could be placed into a helper function, so it's not repetitive.
      const newChef = chefs.find(chef => chef.name === selected);
      await Axios.put(`/api/recipes/${recipeId}`, { name: input, chefId: newChef.id }).then((response) => {
        const updatedRecipe = response.data.updatedRecipe;
        const updatedRecipesList = recipes.map(recipe => recipe.id === recipeId ? updatedRecipe : recipe);
        store.dispatch({  // UPDATE RECIPES LIST
          type: SET_RECIPES,
          recipes: updatedRecipesList
        })
        notification(`"${findRecipe.name}" by ${currentChef.name} has been updated to "${input}" by ${selected}`);
      })
        .catch(error => console.log(error));
    },
    async deleteRecipe(event, recipeId) {
      event.preventDefault();
      const { recipes } = store.getState();
      await Axios.delete(`/api/recipes/${recipeId}`).then((response) => {
        const deletedRecipe = response.data.recipe;
        const updatedRecipes = recipes.filter(recipe => recipe.id !== deletedRecipe.id);
        store.dispatch({  // UPDATE RECIPES LIST
          type: SET_RECIPES,
          recipes: updatedRecipes
        })
        if (response) {
          window.location.href = '/#/recipes';
          notification('delete', `${deletedRecipe.name} was succesfully deleted!`);
        }
      })
        .catch(error => console.log(error))
    }
  };
};

export {
  mapStateToProps,
  mapDispatchToProps
}