import React, { Component } from 'react';
import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../Thunks/thunks';
import store, { SET_CURRENT } from '../store';

class RecipeEdit extends Component {
  state = {
      input: '',
      recipeId: window.location.hash.slice(15),
      selected: ''
  }

  async componentDidUpdate(prevProps){ //to handle page refresh, but for some reason not working, although the structure is the same as in ChefEdit component.
    const {recipes} = this.props;
    const {recipeId} = this.state;
    if(prevProps.recipes === this.props.recipes){
      const findRecipe = recipes.find(recipe => recipe.id === recipeId);
      await store.dispatch({
        type: SET_CURRENT,
        current: findRecipe.name
      })
    }
  }

  async componentDidMount(){ 
    const {recipes} = this.props;
    const {recipeId} = this.state;
    const findRecipe = recipes.find(recipe => recipe.id === recipeId);
    await store.dispatch({
      type: SET_CURRENT,
      current: findRecipe.name
    })
  }

  editRecipe(event){
    this.setState({ input: event.target.value })
  }

  selectedChange(event){
    this.setState({ selected: event.target.value });
  }

  async updateRecipe(event){
    const {updateRecipe} = this.props;
    const {input, recipeId, selected} = this.state;
    const obj = {input, recipeId, selected};
    await updateRecipe(event, obj);
  }

  async deleteRecipe(event){
    const {deleteRecipe} = this.props;
    const {recipeId} = this.state;
    await deleteRecipe(event, recipeId);
  }

  render(){
    const {chefs, current, recipes} = this.props;
    const {input, recipeId} = this.state;
    const findRecipe = recipes.find(recipe => recipe.id === recipeId);
    // const findChef = chefs.find(chef => chef.id === findRecipe.chefId); meant to use this in the select tag as defaultValue={findChef.name}, but creates problems
    const listChefs = chefs.map(chef => {
      return <option key={chef.id} value={`${chef.name}`}>{chef.name}</option>
  
  });
    return (
      <div className="form-input">
        <h2>Edit Recipe</h2>
        <form>
          <input placeholder={current} value={input} onChange={this.editRecipe.bind(this)}/>
          <select onChange={this.selectedChange.bind(this)}>{listChefs}</select>
          <button onClick={this.updateRecipe.bind(this)}>Update</button>
          <button className='delete' onClick={() => this.deleteRecipe(event, recipeId)}>Delete</button>      
        </form>
        <h4 className="notification"></h4>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeEdit);