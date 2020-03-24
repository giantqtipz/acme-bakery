import axios from 'axios';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';

const chefsReducer = (state = [], action)=> {
  return state;
};

const recipesReducer = (state = [], action)=> {
  return state;
};

const reducer = combineReducers({
  chefs: chefsReducer,
  recipes: recipesReducer
});


const store = createStore(reducer, applyMiddleware(thunks));

export default store;

export {

};
