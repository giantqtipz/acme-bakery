import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import ChefsForm from './ChefsForm';
import {connect} from 'react-redux';
import { mapStateToProps } from '../Thunks/thunks';

class Chefs extends Component {
  render(){
    const {chefs, recipes} = this.props;
    const findRecipes = (chefId) => recipes.filter(recipe => recipe.chefId === chefId);
    const listChefs = chefs.map((chef) => {  
      return (
        <li className='chef' key={chef.id}>
          <h3>{chef.name}</h3>
          <h4>{findRecipes(chef.id).length === 0 ? 'No recipes yet!' : 'Recipes:'}</h4>
          <ul className="chef-recipes-list">
            {findRecipes(chef.id).map(recipe => <li className='chef-recipes' key={recipe.id}>{recipe.name}</li>)}
          </ul>
          <div className="edit"><Link to={`/chefs/edit/${chef.id}`} chef={chef.name}>Edit</Link></div>
        </li>
      )
    });
    return (
      <div className="content">
        <ChefsForm />
        <h4 className="notification"></h4>
        <div className="list">
          <ul>{listChefs}</ul>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Chefs);