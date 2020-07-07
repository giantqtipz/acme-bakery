import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../Thunks/thunks';
import store, { SET_CURRENT } from '../store';

class ChefEdit extends Component {
  state = {
    input: '',
    chefId: window.location.hash.slice(13)
  }

  async componentDidMount(){ //still not updating store on page refresh...
    let propsLoaded = false;
    const {chefs, getData} = this.props;
    if(!chefs){
      propsLoaded = false;
      await getData();
    } else {
      propsLoaded = true;
    }

    if(propsLoaded){
      const {chefId} = this.state;
      const findChef = chefs.find(chef => chef.id === chefId);
      await store.dispatch({
        type: SET_CURRENT,
        current: findChef.name
      })
    }
  }

  editChef(event){
    this.setState({input: event.target.value});
  }

  async updateChef(event){
    const {updateChef} = this.props;
    const {input, chefId} = this.state;
    const obj = {input, chefId};
    await updateChef(event, obj);
  }

  async deleteChef(event){
    const {deleteChef} = this.props;
    const {chefId} = this.state;
    await deleteChef(event, chefId);
  }

  render(){
    const {input} = this.state;
    const {current} = this.props;
    return (
      <div className="form-input">
        <h2>Edit Chef</h2>
        <form>
          <input placeholder={current} value={input} onChange={this.editChef.bind(this)}/>
          <button onClick={this.updateChef.bind(this)}>Update</button>
          <button className="delete" onClick={this.deleteChef.bind(this)}>Delete</button>      
        </form>
        <h4 className="notification"></h4>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChefEdit);