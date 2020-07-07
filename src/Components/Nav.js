import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

class Nav extends Component{
  state = {
    hash: window.location.hash.slice(2)
  }

  componentDidMount(){
    window.addEventListener('hashchange', () => {
      this.setState({ hash: window.location.hash.slice(2)});
    })
  }

  render(){
    const {chefs, recipes} = this.props;
    const {hash} = this.state;
    return (
      <nav>
        <NavLink className={hash === 'chefs' ? 'selected' : null}to="/chefs">{`Chefs (${chefs.length})`}</NavLink>
        <NavLink className={hash === 'recipes' ? 'selected' : null} to="/recipes">{`Recipes (${recipes.length})`}</NavLink>      
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chefs: state.chefs,
    recipes: state.recipes,
  }
}

export default connect(mapStateToProps, null)(Nav);