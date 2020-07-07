import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import RecipesForm from './RecipesForm';
import {connect} from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../Thunks/thunks';

class Recipes extends Component {
  render(){
    const {chefs, recipes} = this.props;
    const findChef = (chefId) => chefs.find(chef => chef.id === chefId);
    const listRecipes = recipes.map((recipe) => {
      return(
        <li className='recipe' key={recipe.id}>
          <h4>{recipe.name} by Chef {findChef(recipe.chefId).name}</h4>
          <div className="edit"><Link to={`/recipes/edit/${recipe.id}`}>Edit</Link></div>
        </li>
        )
    });
    return (
      <div className="content">
        <RecipesForm />
        <h4 className="home notification"></h4>
        <div className="list">
          <ul>{listRecipes}</ul>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);