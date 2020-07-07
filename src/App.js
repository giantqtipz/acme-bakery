import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { mapDispatchToProps } from './Thunks/thunks';

import "@babel/polyfill";

import Nav from './Components/Nav';
import Chefs from './Components/Chefs';
import ChefEdit from './Components/ChefEdit';
import Recipes from './Components/Recipes';
import RecipeEdit from './Components/RecipeEdit';

class App extends Component{
  componentDidMount(){
    const {getData} = this.props;
    getData();
  }
  
  render(){
    return ( // path must be exact to render the edit components
      <HashRouter>
        <h1>The Acme Bakery</h1>
        <Nav />
        <Switch>
          <Route exact path='/chefs' render={() => <Chefs /> } />
          <Route path='/chefs/edit/:id' render={() => <ChefEdit /> } />
          <Route exact path='/recipes' render={() => <Recipes /> }/>
          <Route path='/recipes/edit/:id' render={() => <RecipeEdit /> }/>
        </Switch>
      </HashRouter>
    );
  }
};

export default connect(null, mapDispatchToProps)(App);

