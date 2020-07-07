import React, { Component } from 'react';
import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../Thunks/thunks';

class RecipesForm extends Component {
  state = {
      input: '',
      selected: '',
  }

  inputFormChange(event){
      this.setState({input: event.target.value});
  }

  selectedFormChange(event){
      this.setState({selected: event.target.value});
  }

  async addRecipe(event){
    const {input, selected} = this.state;
    const {addRecipe} = this.props;
    const obj = { input, selected };
    await addRecipe(event, obj);
  }

  render(){
    const {chefs} = this.props;
    const {input, selected} = this.state;
    return (
      <div className="form-input">
        <h2>Recipes Listing</h2> 
        <form onSubmit={this.addRecipe.bind(this)}>
          <input placeholder="Enter new recipe" value={input} onChange={this.inputFormChange.bind(this)}/>
          <select value={selected} onChange={this.selectedFormChange.bind(this)}>
              <option value='Select Chef'>Select Chef</option>
              {chefs.map(chef => <option key={chef.id} value={chef.name}>{chef.name}</option> )}
          </select>
          <button>Add Recipe</button>      
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipesForm);