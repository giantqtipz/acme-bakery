import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Route } from 'react-router-dom';

class App extends Component{
  constructor(){
    super();
  }
  componentDidMount(){
    this.props.load();
  }
  render(){
    return (
      <HashRouter>
        <h1>The Acme Bakery</h1>
      </HashRouter>
    );
  }
};

const mapDispatchToProps = (dispatch)=> {
  return {
    load: ()=> {
      console.log('load data');
    }
  };
};

export default connect(null, mapDispatchToProps)(App);

