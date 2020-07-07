import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';

const SET_CHEFS = 'SET_CHEFS';
const SET_RECIPES = 'SET_RECIPES';
const SET_CURRENT = 'SET_CURRENT';

const chefsReducer = (state = [], action)=> {
  switch(action.type){
    case SET_CHEFS:
      return action.chefs
    default:
      return state;
  }
};

const recipesReducer = (state = [], action)=> {
  switch(action.type){
    case SET_RECIPES:
      return action.recipes
    default:  
      return state;
  }
};

const currentReducer = (state = '', action)=> {
  switch(action.type){
    case SET_CURRENT:
      return action.current
    default:  
      return state;
  }
};

const reducer = combineReducers({
  chefs: chefsReducer,
  recipes: recipesReducer,
  current: currentReducer
});

const store = createStore(reducer, applyMiddleware(thunks));

export default store;

export {
  SET_CHEFS,
  SET_RECIPES,
  SET_CURRENT
};
